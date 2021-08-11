function getProduct() {
    const url = new URL(window.location.href);
    console.log(url);
    return fetch("http://localhost:3000/api/" + category + "/" + id)
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas);
        return datas;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
