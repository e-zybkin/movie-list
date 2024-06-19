import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <main className={styles.notFound}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.caption}>Страница не найдена</p>
      <Button variant="contained" type="button" onClick={() => navigate(-1)}>
        Назад
      </Button>
    </main>
  );
}

export default PageNotFound;
