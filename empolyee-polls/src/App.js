import React from 'react';
import { Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
import { connect } from 'react-redux';

import LoginPage from './components/LoginPage';
import NewQuestionPage from './components/NewQuestionPage';
import PollsDashboardPage from './components/PollsDashboardPage';
import QuestionDetailsPage from './components/QuestionDetailsPage';
import LeaderboardPage from './components/LeaderboardPage';
import InfoMessage from './components/InfoMessage';

import SignedUser from './components/SignedUser';
import Nav from './components/NavBar';

import { handleLoadQuestions } from './actions/questions';
import { handleLoadUsers } from './actions/users';

import './css/App.css';

const App = ({ authedUser, dispatch }) => {

  useEffect(() => {
    dispatch(handleLoadQuestions());
    dispatch(handleLoadUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="appHeader">
        <h1 className="appHeaderTitle">Contoso polls</h1>
      </div>
      <SignedUser /> 
      <Nav />
      <hr />
      { !authedUser 
        ? <LoginPage standalone={false}/>
        : <Routes>
            <Route path="*" element={<InfoMessage text="404: Page not found" />} />
            <Route path="/" exact element={<PollsDashboardPage />} />
            <Route path="/questions" exact element={<PollsDashboardPage />} />
            <Route path="/questions/:question_id" element={<QuestionDetailsPage />} />
            <Route path="/add" element={<NewQuestionPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
      }
    </div>
  );
}

export default connect(({ authedUser }) => ({ authedUser }))(App);
