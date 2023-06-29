'use client'

import { useState, useEffect } from "react";
import ValidateFully from "./validateFully"
import ValidateName from "./validateName"


export default function ValidateTable({ children }) {
    const [nameState, setNameState] = useState(false)
    const [fullyState, setFullyState] = useState(false)
    let calculating = true
    let name = null
    let size = null
    let tableID = children.tableID
    let table = children.table
    let tableLoading = children.tableLoading
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
        calculating = false
    }, [tableLoading])
    let valid = false
    if (fullyState && nameState) {
        valid = true
    }
    useEffect(() => {
        setValidated(valid)
    }, [valid]);
    return (
        <>
            {(!nameState && !tableLoading && !calculating) && <ValidateName>{{ setNameState, table, tableID }}</ValidateName>}
            {(!fullyState && nameState && !tableLoading) && <ValidateFully>{{ setFullyState, table, tableID }}</ValidateFully>}
        </>
    )
}