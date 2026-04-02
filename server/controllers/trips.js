import {pool} from '../config/database.js';

const createTrip = async (req, res) => {
    try {
        const { title, description, img_url, num_days, start_date, end_date, total_cost } = req.body
        const insertQuery = `
        INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost) \
        VALUES($1, $2, $3, $4, $5, $6, $7)  \
        RETURNING *`

        const results = await pool.query(insertQuery, [title, description, img_url, num_days, start_date, end_date, total_cost])
        res.status(201).json(results.rows[0])
    } catch (err) {
        console.log("Error creating trip:", err);
        res.status(409).json({ error: 'Failed to create trip' })
    }
}

const getTrips = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM trips ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (err) {
        console.log("Error fetching trips:", err);
         res.status(409).json( { error: err.message } )
    }
}

const getTrip = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const results = await pool.query('SELECT * FROM trips WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (err) {
        console.log("Error fetching trip:", err);
        res.status(409).json({ error: err.message });
    }
}

const updateTrip = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { title, description, img_url, num_days, start_date, end_date, total_cost } = req.body
        const updateQuery = `
        UPDATE trips
        SET title = $1, description = $2, img_url = $3, num_days = $4, start_date = $5, end_date = $6, total_cost= $
        WHERE id = $8
        `
        const results = await pool.query(updateQuery, [title, description, img_url, num_days, start_date, end_date, total_cost, id])
        res.status(200).json(results.rows[0])
    } catch (err) {
        console.log("Error updating trip:", err);
        res.status(409).json({ error: err.message });
    }
}

const deleteTrip = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const activityDeleteQuery = `
        DELETE FROM activities
        WHERE trip_id = $1'
        `
        const activity_deletion = await pool.query(activityDeleteQuery, [id])

        const results = await pool.query('DELETE FROM trips WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (err) {
        console.log("Error deleting trip:", err);
        res.status(409).json({ error: err.message });
    }
}

export default {
    createTrip,
    getTrips,
    getTrip,
    updateTrip,
    deleteTrip
}