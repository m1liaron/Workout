import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const LINK = styled(Link)`
    flex-wrap: wrap;
    padding:40px;
    width:100%;
    height:auto;
    border-radius: 10px;
    background:#fff;
    &:hover{
        background:#C0C0C0;
    }
`;