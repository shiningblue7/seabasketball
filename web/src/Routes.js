// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'
import SchedulesLayout from 'src/layouts/SchedulesLayout'
import SignUpsLayout from 'src/layouts/SignUpsLayout'
import UsersLayout from 'src/layouts/UsersLayout'
import PostsLayout from 'src/layouts/PostsLayout'
import BlogLayout from './layouts/BlogLayout/BlogLayout'
import Standard from './components/Standard/Standard'

import { useAuth } from 'src/auth'


const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={Standard}>
          <Private role={['admin']} unauthenticated="home" redirectTo="home">
          <Set wrap={SchedulesLayout}>
            <Route path="/schedules/new" page={ScheduleNewSchedulePage} name="newSchedule" />
            <Route path="/schedules/{id:Int}/edit" page={ScheduleEditSchedulePage} name="editSchedule" />
            <Route path="/schedules/{id:Int}" page={ScheduleSchedulePage} name="schedule" />
            <Route path="/schedules" page={ScheduleSchedulesPage} name="schedules" />
          </Set>
          <Set wrap={UsersLayout}>
            <Route path="/users/new" page={UserNewUserPage} name="newUser" />
            <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
            <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
            <Route path="/users" page={UserUsersPage} name="users" />
        </Set>
        </Private>
        <Route path="/" page={HomePage} name="home" unauthenticated="{login}" />
        <Route path="/about" page={AboutPage} name="about" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
