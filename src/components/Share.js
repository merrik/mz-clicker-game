import {Fb, Ok, Tg, Tw, Vk} from "./icons";
import React from "react";
import styled from "styled-components";
import * as U from "../utils";

const Share = styled.span`
  a {
    margin-right: 10px;
    :last-of-type {
      margin-right: 0;
    }
  }
`;

export default ({params}) => {
  let shareLink = U.getShareLink();

  for(let param of params) {
    shareLink += `&${param[0]}=${param[1]}`
  }

  const encodeLink = encodeURIComponent(shareLink);
  return (
    <Share>
      <a target="_blank" href={`http://vk.com/share.php?url=${encodeLink}`}><Vk/></a>
      <a target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeLink}`}><Tw/></a>
      <a target="_blank" href={`https://www.facebook.com/dialog/share?app_id=1727953450799543&display=popup&href=${encodeLink}`}><Fb/></a>
      <a target="_blank" href={`https://connect.ok.ru/offer?url=${encodeLink}`}><Ok/></a>
      <a target="_blank" href={`https://t.me/share/url?url=${encodeLink}`}><Tg/></a>
    </Share>
  )
}