const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const id = new URLSearchParams(window.location.search).get("productId");

console.log("RESOURCE ID:", id);

window.addEventListener("DOMContentLoaded", event => {
  const deleteBtn = document.getElementById("deleteBtn");
  if (id) {
    deleteBtn.style.display = "inline-block";
  } else {
    deleteBtn.style.display = "none";
  }
});
if (id) {
  fetch(apiUrl + id, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjdmZDdjMjM5YzAwMTUyZjRiMzkiLCJpYXQiOjE3MTgzNTE4NjksImV4cCI6MTcxOTU2MTQ2OX0.Ta4aG3rki7gZM1L7I7J4j5pbglLQmGGypubujC2yTGY",
    },
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("name").value = data.name;
      document.getElementById("description").value = data.description;
      document.getElementById("brand").value = data.brand;
      document.getElementById("price").value = data.price;
      document.getElementById("image").value = data.imageUrl;
    })
    .catch(error => console.error("Error:", error));
}

function confirmReset() {
  if (confirm("Are you sure you want to reset the form?")) {
    resetForm();
  }
}
function resetForm() {
  document.getElementById("formPhone").reset();
  document.getElementById("deleteBtn").style.display = "none";

  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("brand").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";
}
document
  .getElementById("formPhone")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const product = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      brand: document.getElementById("brand").value,
      imageUrl: document.getElementById("image").value,
      price: document.getElementById("price").value,
    };

    const method = id ? "PUT" : "POST";
    const url = id ? apiUrl + id : apiUrl;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjdmZDdjMjM5YzAwMTUyZjRiMzkiLCJpYXQiOjE3MTgzNTE4NjksImV4cCI6MTcxOTU2MTQ2OX0.Ta4aG3rki7gZM1L7I7J4j5pbglLQmGGypubujC2yTGY",
      },
      body: JSON.stringify(product),
    })
      .then(response => {
        if (!response.ok) {
          alert("phone already registered in the database");
        }
        return response.json();
      })
      .then(data => {
        alert(
          `Product ${method === "POST" ? "created" : "updated"} successfully!`
        );
        resetForm();
      })
      .catch(error => console.error("Error:", error));
  });

function updateProduct() {
  if (!id) {
    alert("No product selected for update");
    return;
  }

  const product = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("image").value,
    price: document.getElementById("price").value,
  };

  fetch(apiUrl + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjdmZDdjMjM5YzAwMTUyZjRiMzkiLCJpYXQiOjE3MTgzNTE4NjksImV4cCI6MTcxOTU2MTQ2OX0.Ta4aG3rki7gZM1L7I7J4j5pbglLQmGGypubujC2yTGY",
    },
    body: JSON.stringify(product),
  })
    .then(response => response.json())
    .then(data => {
      alert("Product updated successfully!");
      resetForm();
    })
    .catch(error => console.error("Error:", error));
}
function confirmDelete() {
  if (confirm("Are you sure you want to delete this product?")) {
    deleteProduct();
  }
}

function deleteProduct() {
  if (!id) {
    alert("No product selected for deletion");
    return;
  }

  fetch(apiUrl + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjdmZDdjMjM5YzAwMTUyZjRiMzkiLCJpYXQiOjE3MTgzNTE4NjksImV4cCI6MTcxOTU2MTQ2OX0.Ta4aG3rki7gZM1L7I7J4j5pbglLQmGGypubujC2yTGY",
    },
  })
    .then(response => {
      if (response.ok) {
        alert("Product deleted successfully!");
        resetForm();
        window.location.search = "";
      } else {
        alert("Failed to delete product!");
      }
    })
    .catch(error => console.error("Error:", error));
}

window.updateProduct = updateProduct;
window.deleteProduct = deleteProduct;
window.resetForm = resetForm;
