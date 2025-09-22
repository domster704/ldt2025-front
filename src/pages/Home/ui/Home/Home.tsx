import React, {FC} from 'react';
import * as style from './Home.module.css'
import {useAppDispatch} from "@app/store/store";

const Home: FC = (props) => {
  const dispatch = useAppDispatch();

  return (
    <main className={style.main}>
      main
    </main>
  );
}

export default Home;