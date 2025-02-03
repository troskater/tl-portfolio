'use client'

import Image from "next/image";
import { useDialog } from '@/components/DialogProvider';

export default function Img(props) {
  const { showDialog } = useDialog()

  return (
    <div className={'img ' + (props.src2 ? 'img-flex-2 ' : '') + (props.showDialog ? 'has-dialog ' : '') + (props.className ?? '')}>
      {props.src ? (<span onClick={() => {
        if (props.showDialog) showDialog(
          <>
            <Image
              src={'/img/' + props.src}
              width={960}
              height={0}
              sizes="60rem"
              style={{ width: '100%', height: 'auto' }}
              alt=""
            />
            <div className="content">
              {props.children}
            </div>
          </>
        )
      }}>
        <Image
          src={'/img/' + props.src}
          fill
          sizes="60rem"
          style={{
            objectFit: props.fit ?? 'cover',
          }}
          alt=""
          priority={props.priority ?? false}
        />
      </span>) : ''}
      {props.src2 ? (<span onClick={() => {
        if (props.showDialog) showDialog(
          <>
            <Image
              src={'/img/' + props.src2}
              width={960}
              height={0}
              sizes="60rem"
              style={{ width: '100%', height: 'auto' }}
              alt=""
            />
            <div className="content">
              {props.children}
            </div>
          </>
        )
      }}>
        <Image
          src={'/img/' + props.src2}
          fill
          sizes="60rem"
          style={{
            objectFit: props.fit ?? 'cover',
          }}
          alt=""
          priority={props.priority ?? false}
        />
      </span>
      ) : ''}
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}