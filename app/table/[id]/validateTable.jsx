'use client'

import { useState, useEffect } from "react";
import ValidateFully from "./validateFully"
import { EditName } from "./editName"


export default function ValidateTable({ children }) {
    const [nameState, setNameState] = useState(false)
    const [fullyState, setFullyState] = useState(false)
    const [calculating, setCalculating] = useState(true)
    let name = null
    let size = null
    let tableID = children.tableID
    let table = children.table
    let setValidated = children.setValidated
    useEffect(() => {
        if (table && !nameState) {
            if (table.name) {
                name = table.name
            }
            else {
                table.name = "test name"
            }
            if (table.size) {
                size = table.size
            }
            else {
                table.size = 3
            }
            if (!table.read) {
                table.read = []
            }
        }
        setNameState((table && name && size) || nameState)
        setCalculating(false)
    }, [])
    let valid = false
    if (fullyState && nameState) {
        valid = true
    }
    useEffect(() => {
        setValidated(valid)
    }, [valid])
    return (
        <>
            {(!nameState && !calculating) && <EditName>{{ setNameState, table, tableID }}</EditName>}
            {(!fullyState && nameState && !calculating) && <ValidateFully>{{ setFullyState, table, tableID }}</ValidateFully>}
            {calculating && <div className='py-6 px-12'>
                <i className="fa-solid fa-spinner text-4xl animate-spin"></i>
            </div>}
        </>
    )
}