import { Typography, List, ListItem, ListItemText } from "@mui/material";
import AudioPlayer from "../UI/AudioPlayer/AudioPlayer";
import styles from "./vocabulary.module.scss";

interface VocabularyItem {
  word: string;
  description: string;
  audio: string;
}

interface VocabularyProps {
  vocabulary: VocabularyItem[];
}

const Vocabulary = ({ vocabulary }: VocabularyProps) => {
  return (
    <div className={styles.vocabulary}>
      <Typography variant="h4" gutterBottom>
        Vocabulary
      </Typography>
      <div className={styles.words}>
        <List>
          {vocabulary.map((item, index) => (
            <div key={index} className={styles.word}>
              <ListItem>
                <ListItemText
                  primary={item.word}
                  secondary={item.description}
                />
                <AudioPlayer src={item.audio} />
              </ListItem>
            </div>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Vocabulary;
