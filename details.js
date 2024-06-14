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
            <ul>   <h4 class="fs-5 my-4">Details</h4>
    <li><strong>Name:</strong> ${product.name}</li>
    <li><strong>Description:</strong> ${product.description}</li>
    <li><strong>Brand:</strong> ${product.brand}</li>
    <li><strong>Price:</strong> $${product.price}</li>
    <li><strong>ID:</strong> ${product._id}</li>
    <li><strong>Created At:</strong> ${new Date(
      product.createdAt
    ).toLocaleString("it-IT")}</li>
    <li><strong>Updated At:</strong> ${new Date(
      product.updatedAt
    ).toLocaleString("it-IT")}</li>
  </ul>
        `;
      document.getElementById("product-details").innerHTML = productDetails;
    })
    .catch(error => {
      console.error("Error:", error);
      document.getElementById("product-details").innerHTML =
        "<p>Error fetching product details.</p>";
    });
}
