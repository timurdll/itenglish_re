import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TaskIcon from "@mui/icons-material/Task";
import slugify from "react-slugify";

interface Row {
  lessonName: string;
}

interface BasicTableProps {
  rows: Row[];
  userProgress?: string[];
}

const BasicTable: React.FC<BasicTableProps> = ({ rows, userProgress = [] }) => {
  const navigate = useNavigate();
  const handleIconClick = (link: string) => {
    navigate(`lessons/${link}`);
  };

  console.log(userProgress);

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ maxWidth: "100%", marginRight: "-15px" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontSize: "20px",
              }}
            >
              Unit name
            </TableCell>
            <TableCell
              sx={{
                fontSize: "20px",
              }}
              align="center"
            >
              Vocabulary
            </TableCell>
            <TableCell
              sx={{
                fontSize: "20px",
              }}
              align="center"
            >
              Reading
            </TableCell>
            <TableCell
              sx={{
                fontSize: "20px",
              }}
              align="center"
            >
              Activities
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.lessonName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  color: userProgress.includes(row.lessonName)
                    ? "green"
                    : "inherit",
                  fontSize: "16px",
                }}
              >
                {row.lessonName}
              </TableCell>

              <TableCell align="center">
                <LibraryBooksIcon
                  style={{ cursor: "pointer", fontSize: "26px" }}
                  onClick={() => handleIconClick(slugify(row.lessonName))}
                />
              </TableCell>
              <TableCell align="center">
                <MenuBookIcon
                  style={{ cursor: "pointer", fontSize: "26px" }}
                  onClick={() => handleIconClick(slugify(row.lessonName))}
                />
              </TableCell>
              <TableCell align="center">
                <TaskIcon
                  style={{ cursor: "pointer", fontSize: "26px" }}
                  onClick={() => handleIconClick(slugify(row.lessonName))}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
