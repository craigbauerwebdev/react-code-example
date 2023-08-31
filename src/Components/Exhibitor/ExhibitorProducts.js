import React from "react";
import exhibitorDocumentStyles from "./scss/exhibitor-documents.module.scss";

export const ExhibitorProducts = ({ products }) => {
  if (!products) {
    return null;
  }

  return (
    <div className={exhibitorDocumentStyles.productContainer}>
      {products.map((product, index) => {
        const productId = index + 1;
        const imageUrl =
          product.small_image_url[0] !== ""
            ? product.small_image_url
            : product.large_image_url;
        return (
          <div className={exhibitorDocumentStyles.products} key={productId}>
            {(product.small_image_url[0] !== "" ||
              product.large_image_url[0] !== "") && (
              <div>
                <img src={imageUrl} alt={product.description} />
                <p>{product.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
