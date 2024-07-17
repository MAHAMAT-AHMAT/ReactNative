import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [newPost, setNewPost] = useState("");
  const [editPost, setEditPost] = useState({ id: null, title: "" });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    dispatch({ type: "SET_POSTS", payload: data });
  };

  const addPost = () => {
    const post = { id: Math.random(), title: newPost };
    dispatch({ type: "ADD_POST", payload: post });
    setNewPost("");
  };

  const deletePost = (id) => {
    dispatch({ type: "DELETE_POST", payload: id });
  };

  const startEditPost = (post) => {
    setEditPost({ id: post.id, title: post.title });
  };

  const editExistingPost = () => {
    dispatch({
      type: "EDIT_POST",
      payload: { id: editPost.id, updatedPost: { title: editPost.title } },
    });
    setEditPost({ id: null, title: "" });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new post"
        value={newPost}
        onChangeText={setNewPost}
      />
      <Button title="Add Post" onPress={addPost} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.buttonsContainer}>
              <Button title="Delete" onPress={() => deletePost(item.id)} />
              <View style={styles.space} />
              <Button title="Edit" onPress={() => startEditPost(item)} />
            </View>
          </View>
        )}
      />
      {editPost.id && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Edit post"
            value={editPost.title}
            onChangeText={(text) => setEditPost({ ...editPost, title: text })}
          />
          <Button title="Save" onPress={editExistingPost} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  post: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  space: {
    width: 10, // Espace de 10 pixels entre les boutons
  },
  editContainer: {
    marginTop: 10,
  },
});

export default Posts;
