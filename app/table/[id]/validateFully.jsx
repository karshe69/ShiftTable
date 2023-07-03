'use client'

import { useEffect, useState } from "react";
import { EditTableSetup } from "./editTableSetup";

export default function ValidateFully({ children }) {
    let table = children.table
    const [rerender, setRerender] = useState(true)
    let tableID = children.tableID

    useEffect(() => {
        let bool = true
        if (!table.titles) {
            bool = false
            table.titles = []
        }
        if (table.titles.length != table.size) {
            bool = false
            for (let i = table.titles.length; i < table.size; i++) {
                table.titles[i] = "temporary title"
            }
        }
        if (!table.personel || !Array.isArray(table.personel)) {
            bool = false
            table.personel = []
            table.length = 0
        }
        for (let i = 0; i < table.personel.length; i++) {
            if (typeof (table.personel[i]) !== 'object') {
                bool = false
                table.personel[i] = {
                    "1sunday": 1,
                    "2monday": 1,
                    "3tuesday": 1,
                    "4wednesday": 1,
                    "5thursday": 1,
                    "6friday": 1,
                    "7saturday": 1
                }
            }
            if (typeof (table.personel[i]["1sunday"]) !== 'number') {
                bool = false
                table.personel[i]["1sunday"] = 1
            }
            if (typeof (table.personel[i]["2monday"]) !== 'number') {
                bool = false
                table.personel[i]["2monday"] = 1
            }
            if (typeof (table.personel[i]["3tuesday"]) !== 'number') {
                bool = false
                table.personel[i]["3tuesday"] = 1
            }
            if (typeof (table.personel[i]["4wednesday"]) !== 'number') {
                bool = false
                table.personel[i]["4wednesday"] = 1
            }
            if (typeof (table.personel[i]["5thursday"]) !== 'number') {
                bool = false
                table.personel[i]["5thursday"] = 1
            }
            if (typeof (table.personel[i]["6friday"]) !== 'number') {
                bool = false
                table.personel[i]["6friday"] = 1
            }
            if (typeof (table.personel[i]["7saturday"]) !== 'number') {
                bool = false
                table.personel[i]["7saturday"] = 1
            }
        }
        if (table.personel.length != table.size) {
            if (table.personel.length > table.size) {
                console.log("woonk woonk");
            }
            for (let i = table.personel.length; i < table.size; i++) {
                table.personel[i] = {
                    "1sunday": 1,
                    "2monday": 1,
                    "3tuesday": 1,
                    "4wednesday": 1,
                    "5thursday": 1,
                    "6friday": 1,
                    "7saturday": 1
                }
            }
            bool = false
        }
        if (!table.days || !Array.isArray(table.personel)) {
            table.days = ["a", "b", "c", "d", "e", "f", "g"]
            bool = false
        }
        children.setFullyState(bool && rerender)
        setRerender(false)
    }, [rerender])

    let setFullyState = children.setFullyState

    return (
        <>
            {!rerender && <EditTableSetup>{{ table, setFullyState, tableID }}</EditTableSetup>}
        </>
    )
}