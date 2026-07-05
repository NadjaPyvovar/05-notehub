import css from "./Loader.module.css";

export default function Loader() {
  return (
    <p className={css.loader} role="status">
      Loading notes...
    </p>
  );
}
