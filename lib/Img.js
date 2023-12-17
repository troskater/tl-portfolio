export default function Img(props) {
  return (
    <div className={'img ' + (props.src2 ? 'img-flex-2 ' : '') + (props.className ?? '')}>
      <span style={{
        background: "url('img/" + props.src + "') lightgray 50% / cover no-repeat"
      }}></span>
      {
        props.src2 ? (
          <span style={{
            background: "url('img/" + props.src2 + "') lightgray 50% / cover no-repeat"
          }}></span>
        ) : ''
      }
    </div>
  );
}