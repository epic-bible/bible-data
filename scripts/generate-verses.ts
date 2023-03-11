import { writeFileSync } from "fs";
import { resolve } from "path";
import consola from "consola";
import kjv from "../data/kjv.json";
import chapters from "./out/chapters.json";

interface Bible {
  id: string;
  name: string;
  abbreviation: string;
  language: string;
  version_id: string;
}

export interface Book {
  book_id: string;
  name: string;
  chapters: number;
  testament: string;
}

export interface Chapter {
  book: string;
  chapter: number;
  chapter_name: string;
  verses_size: number;
  summary?: string;
}

export type FullVerseReference =
  `${Bible["abbreviation"]}:${Book["name"]}:${Chapter["chapter"]}:${number}`;

export interface Verse {
  bible_version: Bible["abbreviation"];
  reference: FullVerseReference;
  book: Book;
  chapter: Chapter;
  text: string;
  number: number;
}

/**
 * Generate Verses
 */
function generateVerses() {
  const allVerses = (chapters as Chapter[]).reduce((_acc, _curr) => {
    // const book = (books as Book[]).find((b) => b.name === _curr.book);
    const kjvChapter = (kjv as any)[_curr.book][_curr.chapter];
    const verses = Object.keys(kjvChapter).reduce((acc, curr) => {
      const verse = kjvChapter[curr];
      const verseData = {
        _v: "KJV",
        ref: `${_curr.book} ${_curr.chapter}:${curr}`,
        book: _curr.book,
        chapter: Number(_curr.chapter),
        text: verse,
        verse: Number(curr),
      };
      // @ts-ignore
      acc.push(verseData);
      return acc;
    }, [] as Verse[]);
    // @ts-ignore
    _acc.push(...verses);
    return _acc;
  }, [] as Verse[]);

  writeFileSync(
    resolve(__dirname, "./out/verses.json"),
    JSON.stringify(allVerses)
  );
  return allVerses;
}

try {
  const bibles = generateVerses();
  consola.success("Verses generated successfully", bibles);
} catch (error) {
  consola.error(error);
}
