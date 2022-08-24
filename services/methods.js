const moment    = require('moment')
const mysqlConn = require('../config/mysqlConn')

/**
 ** QUERY DATA FROM DATABASSE
 
 *  @param { String }   tablename 
 *  @param { Object }   params
 */
const getDataFromDb = async (tables, params) => {
    let query
    if (Object.keys(tables).length > 1) {
        query = `SELECT * FROM ${tables.base} t1
        JOIN ${tables.join1} t2
        ON t1.id = t2.recept_id
        ORDER BY t1.id`
    } else {
        if (Object.keys(params).length > 0) {
            query = `SELECT * FROM ${tables.base} WHERE ?`
        } else {
            query = `SELECT * FROM ${tables.base}`
        }
    }
    const data = new Promise( async (resolve, reject) => {
        await mysqlConn.query(query, params, (err, result) => {
            if(err) return reject(err)
            else return resolve(result)
        })
    })
    return data
}

/**
 ** SAVE DATA TO DATABASSE

 *  @param { String }   tablename 
 *  @param { Object }   params 
 */
const saveDataToDb = async (tablename, params) => {
    const query = `INSERT INTO ${tablename} SET ?`
    const data = new Promise( async (resolve, reject) => {
        await mysqlConn.query(query, params, (err, result) => {
            if(err) return reject(err)
            else return resolve(result)
        })
    })
    return "DATA SAVED"
}

/**
 ** UPDATE DATA IN DATABASE
 * 
 * @param { String } query 
 * @returns 
 */
const updateDataInDb = (query) => {
    const data = new Promise( async (resolve, reject) => {
        await mysqlConn.query(query, (err, result) => {
            if(err) return reject(err)
            else return resolve(result)
        })
    })
    return data
}

/**
 ** CONT DATA ROWS 
 * 
 * @param { String }    tablename 
 * @param { Object}     params 
 * @returns 
 */
const countData = (tablename, params) => {
    const query = `SELECT COUNT(*) darab FROM ${tablename} WHERE deviceId = '${params.deviceId}'`
    const rows = new Promise( async (resolve, reject) => {
        await mysqlConn.query(query, params, (err, result) => {
            if(err) return reject(err)
            else return resolve(result)
        })
    })
    return rows
}

/**
 * *    CURRENT TIMESTAMP
 */
const timeStamp = () => { return moment(new Date()).format('YYYY-MM-DD HH:mm:ss') }

const services = {
    countData,
    getDataFromDb,
    saveDataToDb,
    timeStamp,
    updateDataInDb
}

module.exports = services
