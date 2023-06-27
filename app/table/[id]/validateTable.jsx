'use client'

import { useState, useEffect } from "react";
import ValidateFully from "./validateFully"
import ValidateName from "./validateName"


export default function ValidateTable({ children }) {
    const [nameState, setNameState] = useState(false)
    const [fullyState, setFullyState] = useState(false)
    let name = null
    let size = null
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
        let bool = false
        if (table && nameState) {
            console.log(111);
            bool = true
            if (!table.titles) {
                bool = false
                table.titles = []
            }
            if (table.titles.length != table.size) {
                bool = false
                for (let i = table.titles.length; i < table.size; i++) {
                    table.titles[i] = ""
                }
            }
            if (!table.personel || typeof (table.personel) !== 'array') {
                bool = false
                table.personel = []
            }
            console.log(555, table.personel.length, table.personel);
            for (let i = 0; i < table.personel.length; i++) {
                console.log(table.personel[i], typeof (table.personel[i]), 666);
                if (typeof (table.personel[i]) !== 'object') {
                    console.log(123);
                    bool = false
                    table.personel[i] = {}
                }
                if (typeof (table.personel[i].sunday) !== 'number') {
                    bool = false
                    table.personel[i].sunday = 1
                }
                if (typeof (table.personel[i].monday) !== 'number') {
                    bool = false
                    table.personel[i].monday = 1
                }
                if (typeof (table.personel[i].tuesday) !== 'number') {
                    bool = false
                    table.personel[i].tuesday = 1
                }
                if (typeof (table.personel[i].wednesday) !== 'number') {
                    bool = false
                    table.personel[i].wednesday = 1
                }
                if (typeof (table.personel[i].thursday) !== 'number') {
                    bool = false
                    table.personel[i].thursday = 1
                }
                if (typeof (table.personel[i].friday) !== 'number') {
                    bool = false
                    table.personel[i].friday = 1
                }
                if (typeof (table.personel[i].saturday) !== 'number') {
                    bool = false
                    table.personel[i].saturday = 1
                }
            }
            if (table.personel.length != table.size) {
                for (let i = table.personel.length; i < table.size; i++) {
                    table.personel[i] = {
                        sunday: 1,
                        monday: 1,
                        tuesday: 1,
                        wednesday: 1,
                        thursday: 1,
                        friday: 1,
                        saturday: 1
                    }
                }
                bool = false
            }
        }
        console.log(bool);
        setFullyState(bool)
    }, [tableLoading, nameState])
    console.log(nameState, fullyState);
    if (fullyState && nameState) {
        console.log(table);
        //TODO set table to db
    }
    useEffect(() => {
        setValidated(true)
    }, []);
    return (
        <>
            {(!nameState && !tableLoading) && <ValidateName>{{ setNameState, table }}</ValidateName>}
            {(!fullyState && nameState && !tableLoading) && <ValidateFully>{{ setFullyState, table }}</ValidateFully>}
        </>
    )
}