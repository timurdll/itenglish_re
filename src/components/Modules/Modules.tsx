import { Divider } from "@mui/material";
import styles from "./modules.module.scss";
import BasicTable from "../UI/Table/Simpletable";
import { useAuth } from "../../hooks/use-auth";
import { useGetUserQuery } from "../../store/usersApi";

const Modules = ({ rowData }) => {
  const { id } = useAuth();
  const { data } = useGetUserQuery({ id });

  return (
    <section className={styles.modules}>
      <h2>Modules</h2>
      <Divider sx={{ mb: 2 }} />
      <BasicTable rows={rowData} userProgress={data?.progress} />
    </section>
  );
};

export default Modules;
