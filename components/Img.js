'use client'

import { useEffect, useRef } from "react";

export default function Img(props) {
  const dialog = useRef(false)
  const dialog2 = useRef(false)

  return (
    <div className={'img ' + (props.src2 ? 'img-flex-2 ' : '') + (props.className ?? '')}>
      <span style={{
        background: "url('img/" + props.src + "') lightgray 50% / cover no-repeat"
      }} onClick={() => {
        props.showDialog ? dialog.current.showModal() : ''
      }}>{
          props.showDialog ? (
            <dialog ref={dialog} onClick={(e) => {
              e.stopPropagation()
              dialog.current.close()
            }}><img src={'img/' + props.src} alt="" /></dialog>
          ) : ''
        }</span>
      {
        props.src2 ? (
          <span style={{
            background: "url('img/" + props.src2 + "') lightgray 50% / cover no-repeat"
          }} onClick={() => {
            props.showDialog ? dialog2.current.showModal() : ''
          }}>{
              props.showDialog ? (
                <dialog ref={dialog2} onClick={(e) => {
                  e.stopPropagation()
                  dialog2.current.close()
                }}><img src={'img/' + props.src2} alt="" /></dialog>
              ) : ''
            }</span>
        ) : ''
      }
    </div>
  );
}