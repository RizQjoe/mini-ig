window.fbAsyncInit = function() {
  FB.init({
    appId      : '1595971680477286',
    xfbml      : true,
    version    : 'v2.10'
  });
  FB.AppEvents.logPageView();

  FB.getLoginStatus(function(response) {
    statusChangeCallback (response)
    console.log(response);
  });
};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback (response) {
  if (response.status === 'connected') {
    localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
    testAPI()
    // getTimelineFB()
    // $('#login-btn').fadeOut('slow')
    // $('#timeline-wrapper').fadeIn('slow')
  }
}

function testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      console.log(localStorage.getItem('fbaccesstoken'));
      axios.get('http://localhost:3000/facebook/me', {
        headers: {
          accesstoken: localStorage.getItem('fbaccesstoken')
        }
      })
      .then(response =>{

        console.log('data dari server' , response.data)

        document.getElementById('status').innerHTML =  'Thanks for logging in, ' + response.data.name + '!';

      }

        ) // di dalam response axios ada data selain dari server

      .catch(err => {console.log(err);})

  }


function FBLogin () {
  FB.login(function(response) {
    console.log('fblogin response ',response)
    if (response.authResponse) {
      localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
      window.location.href='index_asli.html'
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }, {scope: 'public_profile,email'});
}

function FBLogout () {
  // FB.logout(function(response) {
  //   // user is now logged out
  //   console.log('fblogout response ', response);
  // });

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      // the user is logged in and has authenticated your
      // app, and response.authResponse supplies
      // the user's ID, a valid access token, a signed
      // request, and the time the access token
      // and signed request each expire
      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;

      FB.api('/'+uid+'/permissions', 'delete', function(response){
        localStorage.removeItem('fbaccesstoken')
        console.log('fblogout response ', response);
        document.location.href="login.html"
      });

    } else if (response.status === 'not_authorized') {
      // the user is logged in to Facebook,
      // but has not authenticated your app
      console.log('the user is logged in to Facebook, but has not authenticated your app');
    } else {
      // the user isn't logged in to Facebook.
      console.log('the user isn\'t logged in to Facebook.');
    }
   });
}

// function handleResponses (response) {
//   next = response.data.paging.next
//   prev = response.data.paging.previous
//
//   response.data.data.forEach((data) => {
//     // if (data.story && data.message) {
//     $('#timeline').append(`
//       <div class="panel panel-primary">
//         <div class="panel-heading">
//           <a href="https://facebook.com/${data.id}" class="close" target="_blank">
//             <i class="fa fa-external-link-square"></i>
//           </a>
//           <h3 class="panel-title">${data.story || 'Your Status'}</h3>
//         </div>
//         <div class="panel-body">
//           ${data.message || ''}
//         </div>
//       </div>
//     `)
//   })
// }

// function getTimelineFB () {
//   axios.get('http://localhost:3000/fbtimeline', {
//     headers: {
//       accesstoken: localStorage.getItem('fbaccesstoken')
//     }
//   })
//   .then(response => {
//     console.log(response)
//     handleResponses(response)
//   })
//   .catch(err => console.log(err))
// }

// function prevNextTimeline (cursor) {
//   $('#timeline').html('')
//   axios.get(cursor)
//   .then(response => {
//     handleResponses(response)
//   })
//   .catch(err => {
//     console.log(err)
//   })
// }

// function postStatus () {
//   console.log('post status')
//   axios.post('http://localhost:3000/fbtimeline', {
//     status: $('#status').val()
//   }, {
//     headers: {
//       accesstoken: localStorage.getItem('fbaccesstoken')
//     }
//   })
//   .then(response => {
//     console.log(response)
//     $('#timeline').prepend(`
//       <div class="panel panel-primary">
//         <div class="panel-heading">
//           <a href="https://facebook.com/${response.data.id}" class="close" target="_blank">
//             <i class="fa fa-external-link-square"></i>
//           </a>
//           <h3 class="panel-title">Your Status</h3>
//         </div>
//         <div class="panel-body">
//           ${$('#status').val()}
//         </div>
//       </div>
//     `)
//     $('#status').val('')
//   })
//   .catch(err => {
//     console.log(err)
//   })
// }
