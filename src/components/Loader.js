export default function Loader(props) {
  return (
    <section className="loading-container">
      <div className="loading-anim">
        <div></div>
        <div></div>
        <div></div>
      </div>
      {props.text ? <p>{props.text}</p> : ''}
    </section>
  )
}