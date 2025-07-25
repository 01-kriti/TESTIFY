import mysql from "mysql2/promise"

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "testify",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Define types for our database entities
export interface User {
  u_id: number
  name: string
  email: string
  password: string
  gender: string | null
  age: number | null
  domain: string | null
}

export interface Quiz {
  q_id: number
  name: string
  time: Date
}

export interface Question {
  ques_id: number
  q_id: number
  marks: number
  text: string
}

export interface Option {
  o_id: number
  ques_id: number
  text: string
  is_correct: boolean
}

export interface UserResponse {
  u_id: number
  q_id: number
  ques_id: number
  o_id: number
  time: Date
}

export interface Result {
  res_id: number
  u_id: number
  q_id: number
  score: number
  time_taken: Date
  rank: number | null
}

// Type for insert results
export interface InsertResult {
  insertId: number
  affectedRows: number
  changedRows: number
}

// Helper function to execute SQL queries with proper typing
export async function query<T>(sql: string, params: any[] = []): Promise<T[]> {
  try {
    const [results] = await pool.execute(sql, params)
    return results as T[]
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

// User related queries
export const userQueries = {
  // Get user by email
  getUserByEmail: async (email: string): Promise<User | null> => {
    try {
      const users = await query<User>("SELECT * FROM User WHERE email = ?", [email])
      console.log("getUserByEmail result:", JSON.stringify(users, null, 2))
      return users.length > 0 ? users[0] : null
    } catch (error) {
      console.error("Error getting user by email:", error)
      throw error
    }
  },

  // Get user by ID
  getUserById: async (id: number): Promise<User | null> => {
    try {
      const users = await query<User>("SELECT * FROM User WHERE u_id = ?", [id])
      return users.length > 0 ? users[0] : null
    } catch (error) {
      console.error("Error getting user by ID:", error)
      throw error
    }
  },

  // Create new user
  createUser: async (name: string, email: string, password: string, gender: string, age: number, domain: string) => {
    try {
      const result = await query<InsertResult>(
        "INSERT INTO User (name, email, password, gender, age, domain) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, password, gender, age, domain],
      )

      console.log("Insert result:", result)
      return result
    } catch (error) {
      console.error("Error creating user:", error)
      throw error
    }
  },

  // Update user details
  updateUser: async (
    userId: number,
    name: string,
    email: string,
    gender: string | null,
    age: number | null,
    domain: string | null,
  ) => {
    try {
      return await query<InsertResult>(
        "UPDATE User SET name = ?, email = ?, gender = ?, age = ?, domain = ? WHERE u_id = ?",
        [name, email, gender, age, domain, userId],
      )
    } catch (error) {
      console.error("Error updating user:", error)
      throw error
    }
  },

  // Update user password
  updateUserPassword: async (userId: number, hashedPassword: string) => {
    try {
      return await query<InsertResult>("UPDATE User SET password = ? WHERE u_id = ?", [hashedPassword, userId])
    } catch (error) {
      console.error("Error updating user password:", error)
      throw error
    }
  },

  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    return await query<User>("SELECT * FROM User")
  },
}

// Quiz related queries
export const quizQueries = {
  // Get all quizzes
  getAllQuizzes: async (): Promise<Quiz[]> => {
    return await query<Quiz>("SELECT * FROM Quiz")
  },

  // Get quiz by id
  getQuizById: async (id: number): Promise<Quiz | null> => {
    const quizzes = await query<Quiz>("SELECT * FROM Quiz WHERE q_id = ?", [id])
    return quizzes.length > 0 ? quizzes[0] : null
  },

  // Create new quiz
  createQuiz: async (name: string, time: number) => {
    return await query<InsertResult>("INSERT INTO Quiz (name, time) VALUES (?, ?)", [name, time])
  },
}

// Question related queries
export const questionQueries = {
  // Get questions by quiz id
  getQuestionsByQuizId: async (quizId: number): Promise<Question[]> => {
    return await query<Question>("SELECT * FROM Question WHERE q_id = ?", [quizId])
  },

  // Create new question
  createQuestion: async (quizId: number, text: string, marks: number) => {
    return await query<InsertResult>("INSERT INTO Question (q_id, text, marks) VALUES (?, ?, ?)", [quizId, text, marks])
  },
}

// Options related queries
export const optionQueries = {
  // Get options by question id
  getOptionsByQuestionId: async (questionId: number): Promise<Option[]> => {
    return await query<Option>("SELECT * FROM Options WHERE ques_id = ?", [questionId])
  },

  // Create new option
  createOption: async (questionId: number, text: string, isCorrect: boolean) => {
    return await query<InsertResult>("INSERT INTO Options (ques_id, text, is_correct) VALUES (?, ?, ?)", [
      questionId,
      text,
      isCorrect,
    ])
  },
}

// User response related queries
export const userResponseQueries = {
  // Create user response
  createUserResponse: async (userId: number, quizId: number, questionId: number, optionId: number) => {
    return await query<InsertResult>(
      "INSERT INTO User_Response (u_id, q_id, ques_id, o_id, time) VALUES (?, ?, ?, ?, NOW())",
      [userId, quizId, questionId, optionId],
    )
  },

  // Get user responses for a quiz
  getUserResponsesByQuizId: async (userId: number, quizId: number): Promise<UserResponse[]> => {
    return await query<UserResponse>("SELECT * FROM User_Response WHERE u_id = ? AND q_id = ?", [userId, quizId])
  },
}

// Result related queries
export const resultQueries = {
  // Create result
  createResult: async (userId: number, quizId: number, score: number, timeTaken: number, rank: number) => {
    return await query<InsertResult>(
      "INSERT INTO Result (u_id, q_id, score, time_taken, rank) VALUES (?, ?, ?, ?, ?)",
      [userId, quizId, score, timeTaken, rank],
    )
  },

  // Get result by user and quiz
  getResultByUserAndQuiz: async (userId: number, quizId: number): Promise<Result | null> => {
    const results = await query<Result>("SELECT * FROM Result WHERE u_id = ? AND q_id = ?", [userId, quizId])
    return results.length > 0 ? results[0] : null
  },

  // Get leaderboard
  getLeaderboard: async () => {
    return await query<{
      name: string
      u_id: number
      avg_score: number
      tests_taken: number
      rank: number
    }>(`
      SELECT u.name, u.u_id, AVG(r.score) as avg_score, COUNT(r.res_id) as tests_taken,
      RANK() OVER (ORDER BY AVG(r.score) DESC) as rank
      FROM Result r
      JOIN User u ON r.u_id = u.u_id
      GROUP BY u.u_id
      ORDER BY avg_score DESC
      LIMIT 10
    `)
  },
}
