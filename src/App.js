import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";




const BASE_URL = "https://jsonplaceholder.typicode.com";

const Home = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios.get(`${BASE_URL}/users`).then((response) => {
			setUsers(response.data);
		});
	}, []);

	return (
		<div>
			<h1>User List</h1>
			<ul>
				{users.map((user) => (
					<li key={user.id}>
						<Link to={`/user/${user.id}`}>{user.username}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};





const UserDetails = () => {
  const { id } = useParams();
  const userId = id;
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [postSearch, setPostSearch] = useState('');
  const [albumSearch, setAlbumSearch] = useState('');
  const [postSortOrder, setPostSortOrder] = useState('asc');
  const [albumSortOrder, setAlbumSortOrder] = useState('asc');

  useEffect(() => {
    axios.get(`${BASE_URL}/users/${userId}`).then((response) => {
      setUser(response.data);
    });

    axios.get(`${BASE_URL}/posts?userId=${userId}`).then((response) => {
      setPosts(response.data);
    });

    axios.get(`${BASE_URL}/albums?userId=${userId}`).then((response) => {
      setAlbums(response.data);
    });
  }, [userId]);

  const handlePostSearchChange = (e) => {
    setPostSearch(e.target.value);
  };

  const handlePostSortChange = () => {
    setPostSortOrder(postSortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleAlbumSearchChange = (e) => {
    setAlbumSearch(e.target.value);
  };

  const handleAlbumSortChange = () => {
    setAlbumSortOrder(albumSortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(postSearch.toLowerCase())
  );

  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(albumSearch.toLowerCase())
  );

  return (
    <div>
      <h1>{user.username}'s Details</h1>
      <p>Email: {user.email}</p>

      <h2>Posts</h2>
      <div>
        <input
          type="text"
          placeholder="Search by title"
          value={postSearch}
          onChange={handlePostSearchChange}
        />
        <button onClick={handlePostSortChange}>
          Sort {postSortOrder === 'asc' ? 'ASC' : 'DESC'}
        </button>
      </div>
      <ul>
        {filteredPosts
          .sort((a, b) =>
            postSortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
          )
          .map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
      </ul>

      <h2>Albums</h2>
      <div>
        <input
          type="text"
          placeholder="Search by title"
          value={albumSearch}
          onChange={handleAlbumSearchChange}
        />
        <button onClick={handleAlbumSortChange}>
          Sort {albumSortOrder === 'asc' ? 'ASC' : 'DESC'}
        </button>
      </div>
      <ul>
        {filteredAlbums
          .sort((a, b) =>
            albumSortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
          )
          .map((album) => (
            <li key={album.id}>{album.title}</li>
          ))}
      </ul>
    </div>
  );
};



const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/user/:id' element={<UserDetails />} />
				<Route path='/' element={<Home />} />
			</Routes>
		</Router>
	);
};

export default App;
