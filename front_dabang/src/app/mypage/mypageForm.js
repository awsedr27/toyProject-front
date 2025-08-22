'use client'
import Image from "next/image"
import { TextFields } from "@mui/icons-material";
import {Button} from "@mui/material";
import Trans from "../components/common/Trans";

export default function MyPageForm() {
    const user = {};


    return(
        <>
            {/* {profileName} */}
            test <Trans tkey={"COMM.USER.TITLE"}/>
            <Button>11</Button>
            <Button>22</Button>
            <Button>33</Button>

        </>
    )
}