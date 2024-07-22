import React from "react";

export default function Skeleton() {
  return (
    <main className="w-[90%]">
      <ul className="o-vertical-spacing o-vertical-spacing--l ">
        <li className="blog-post o-media">
          <div className="o-media__body w-full">
            <div className="o-vertical-spacing">
              <h3 className="blog-post__headline">
                <span className="skeleton-box" style={{ width: "90%" }} />
              </h3>
              <p>
                <span className="skeleton-box" style={{ width: "80%" }} />
                <span className="skeleton-box" style={{ width: "90%" }} />
                <span className="skeleton-box" style={{ width: "83%" }} />
                <span className="skeleton-box" style={{ width: "80%" }} />
              </p>
              <div className="blog-post__meta">
                <span className="skeleton-box" style={{ width: "70%" }} />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </main>
  );
}
