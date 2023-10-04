"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@components/Profile";
const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);

      const data = await response.json();
      console.log(data);
      setPosts(data);
    };

    const getUser = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    };
    if (userId) getPosts();
    if (userId && session?.user.id !== userId) getUser();
  }, [userId]);
  const handleDelete = async post => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter(p => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleEdit = post => router.push(`/update-prompt?id=${post._id}`);

  return (
    <Profile
      name={session?.user.id === userId ? "My" : user?.username}
      desc='Welcome to your personalized profile page'
      data={posts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default MyProfile;
