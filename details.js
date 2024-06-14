const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
window.addEventListener("DOMContentLoaded", event => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("productId");

  if (productId) {
    fetchProductDetails(productId);
  } else {
    document.getElementById("product-details").innerHTML =
      "<p>No product ID specified.</p>";
  }
});

function fetchProductDetails(productId) {
  fetch(apiUrl + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjdmZDdjMjM5YzAwMTUyZjRiMzkiLCJpYXQiOjE3MTgzNTE4NjksImV4cCI6MTcxOTU2MTQ2OX0.Ta4aG3rki7gZM1L7I7J4j5pbglLQmGGypubujC2yTGY",
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error fetching product details");
      }
      return response.json();
    })
    .then(product => {
      const productDetails = `
          <div class="card">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
            <p class="card-text"><strong>Price:</strong> $${product.price}</p>
            <p class="card-text"><strong>ID:</strong> ${product._id}</p>
            <p class="card-text"><strong>Created At:</strong> ${new Date(
              product.createdAt
            ).toLocaleString("it-IT")}</p>
            <p class="card-text"><strong>Updated At:</strong> ${new Date(
              product.updatedAt
            ).toLocaleString("it-IT")}</p>
          </div>
        `;
      document.getElementById("product-details").innerHTML = productDetails;
    })
    .catch(error => {
      console.error("Error:", error);
      document.getElementById("product-details").innerHTML =
        "<p>Error fetching product details.</p>";
    });
}
