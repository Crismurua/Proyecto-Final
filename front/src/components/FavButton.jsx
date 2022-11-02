import React from "react";
import { AiFillHeart } from "react-icons/ai";
import s from "../styles/favsbutton.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function FavButton({ id, user, iamInFavPage }) {
  const navigate = useNavigate();
  function handleFav(e) {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        title: "Wait...",
        text: "Your have to sign in to add a favorite",
        icon: "failure",
        showDenyButton: false,
        denyButtonText: "",
        denyButtonColor: "rgba(11, 115, 147, 0.713)",
        confirmButtonText: "Sign In",
        confirmButtonColor: "rgb(9, 102, 74)",
      }).then((res) => {
        navigate("/sign-in");
      });
    }
    if (iamInFavPage) {
      return axios
        .delete(
          `https://us-central1-api-plants-b6153.cloudfunctions.net/app/favourites/${id}`,
          { userID: user }
        )
        .then((res) => {
          window.alert(res.data);
        });
    }
    axios
      .post(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/favourites/${id}`,
        { userID: user }
      )
      .then((res) => {
        window.alert(res.data);
      });
  }

  return (
    <button onClick={handleFav}>
      <AiFillHeart className={s.hearth} />
    </button>
  );
}
