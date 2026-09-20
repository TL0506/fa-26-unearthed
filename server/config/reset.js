import './dotenv.js'
import { pool } from './database.js'
import giftData from '../data/gifts.js'

const createGiftsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS gifts;

    CREATE TABLE IF NOT EXISTS gifts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      pricePoint VARCHAR(10) NOT NULL,
      audience VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      submittedBy VARCHAR(255) NOT NULL,
      submittedOn TIMESTAMP NOT NULL
    )
  `

  try {
    await pool.query(createTableQuery)
    console.log('🎉 gifts table created successfully')
  } catch (err) {
    console.error('⚠️ error creating gifts table', err)
    throw err
  }
}

const seedGiftsTable = async () => {
  await createGiftsTable()

  for (const gift of giftData) {
    const insertQuery = {
      text: `
        INSERT INTO gifts (name, pricePoint, audience, image, description, submittedBy, submittedOn)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      values: [
        gift.name,
        gift.pricePoint,
        gift.audience,
        gift.image,
        gift.description,
        gift.submittedBy,
        gift.submittedOn
      ]
    }

    try {
      await pool.query(insertQuery)
      console.log(`✅ ${gift.name} added successfully`)
    } catch (err) {
      console.error('⚠️ error inserting gift', err)
    }
  }
}

seedGiftsTable()
  .then(() => {
    console.log('✨ gift data seeding complete')
    process.exit(0)
  })
  .catch((err) => {
    console.error('❌ seeding failed', err)
    process.exit(1)
  })
