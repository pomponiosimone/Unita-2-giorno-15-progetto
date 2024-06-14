const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const accessToken = "Bearer YOUR_ACCESS_TOKEN";

window.addEventListener("DOMContentLoaded", event => {
  fetchProducts();
});

function fetchProducts() {
  fetch(apiUrl, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjdmZDdjMjM5YzAwMTUyZjRiMzkiLCJpYXQiOjE3MTgzNTE4NjksImV4cCI6MTcxOTU2MTQ2OX0.Ta4aG3rki7gZM1L7I7J4j5pbglLQmGGypubujC2yTGY",
    },
  })
    .then(response => response.json())
    .then(data => {
      const productList = document.getElementById("productList");
      productList.innerHTML = "";
      data.forEach(product => {
        const card = `
            <div class="col-md-4">
              <div class="card">
                <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
                  <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                  <a href="backoffice.html?productId=${product._id}" class="btn btn-primary">Edit</a>
                    <a href="details.html?productId=${product._id}" class="btn btn-secondary">Details</a>
                </div>
              </div>
            </div>
          `;
        productList.innerHTML += card;
      });
    })
    .catch(error => console.error("Error:", error));
}
