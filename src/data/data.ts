export const fileExplorer = [
  {
    id: "1",
    name: "root",
    type: "folder",
    children: [
      {
        id: "1-1",
        name: "src",
        type: "folder",
        children: [
          {
            id: "1-1-1",
            name: "components",
            type: "folder",
            children: [
              { id: "1-1-1-1", name: "Button.jsx", type: "file" },
              { id: "1-1-1-2", name: "Modal.jsx", type: "file" },
            ],
          },
          { id: "1-1-2", name: "App.jsx", type: "file" },
          { id: "1-1-3", name: "index.js", type: "file" },
        ],
      },
      {
        id: "1-2",
        name: "public",
        type: "folder",
        children: [
          { id: "1-2-1", name: "index.html", type: "file" },
          { id: "1-2-2", name: "favicon.ico", type: "file" },
        ],
      },
      { id: "1-3", name: "package.json", type: "file" },
      { id: "1-4", name: "README.md", type: "file" },
    ],
  },
  {
    id: "2",
    name: "rahul folder",
    type: "folder",
  },
  {
    id: "3",
    name: "package.json",
    type: "file",
  },
  {
    id: "4",
    name: "README.md",
    type: "file",
  },
];
