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


const Routes = () => {
  return (
    <Router>
    <Route path="/signup" page={SignupPage} name="signup" />
    {/* <Set wrap={SchedulesLayout}>
    <Route path="/schedules/new" page={ScheduleNewSchedulePage} name="newSchedule" />
    <Route path="/schedules/{id:Int}/edit" page={ScheduleEditSchedulePage} name="editSchedule" />
    <Route path="/schedules/{id:Int}" page={ScheduleSchedulePage} name="schedule" />
    <Route path="/schedules" page={ScheduleSchedulesPage} name="schedules" />
    </Set> */}
    {/* <Route path="/test" page={TestPage} name="test" /> */}
    <Set wrap={SignUpsLayout}>
      <Route path="/sign-ups/new" page={SignUpNewSignUpPage} name="newSignUp" />
      <Route path="/sign-ups/{id:Int}/edit" page={SignUpEditSignUpPage} name="editSignUp" />
      <Route path="/sign-ups/{id:Int}" page={SignUpSignUpPage} name="signUp" />
      <Route path="/sign-ups" page={SignUpSignUpsPage} name="signUps" />
    </Set>
    {/* <Set wrap={UsersLayout}>
      <Route path="/users/new" page={UserNewUserPage} name="newUser" />
      <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
      <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
      <Route path="/users" page={UserUsersPage} name="users" />
    </Set> */}
    {/* <Private unauthenticated='home'>
      <Set wrap={PostsLayout}>
        <Route path="/admin/posts/new" page={PostNewPostPage} name="newPost" />
        <Route path="/admin/posts/{id:Int}/edit" page={PostEditPostPage} name="editPost" />
        <Route path="/admin/posts/{id:Int}" page={PostPostPage} name="post" />
        <Route path="/admin/posts" page={PostPostsPage} name="posts" />
      </Set>
    </Private> */}
      {/* <Set wrap={BlogLayout}> */}

        {/* <Route path="/blog-post/{id:Int}" page={BlogPostPage} name="blogPost" /> */}
        {/* <Route path="/about" page={AboutPage} name="about" /> */}
        {/* <Route path="/" page={HomePage} name="home" /> */}
      {/* </Set> */}
      {/* <Set wrap={BlogLayout}> */}
      <Set wrap={Standard}>
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
        <Route path="/" page={HomePage} name="home" unauthenticated='about' />

        {/* <Route path="/schedules/new" page={ScheduleNewSchedulePage} name="newSchedule" />
        <Route path="/schedules/{id:Int}/edit" page={ScheduleEditSchedulePage} name="editSchedule" />
        <Route path="/schedules/{id:Int}" page={ScheduleSchedulePage} name="schedule" />
        <Route path="/schedules" page={ScheduleSchedulesPage} name="schedules" /> */}
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
