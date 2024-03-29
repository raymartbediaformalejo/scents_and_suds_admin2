import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled, Box } from "@mui/material";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
export default function DeleteCategoryPage() {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState("");
  const { id } = router.query;
  const categoryId = id[0];
  console.log(categoryId);
  useEffect(() => {
    async function getCategoryData() {
      try {
        const response = await axios.get("/api/categories2", {
          params: {
            id: id[0],
          },
        });
        const data = response.data.name;
        setCategoryName(data);
      } catch (error) {
        console.log(`💥💥💥${error}`);
      }
    }
    if (id && id[0]) {
      getCategoryData();
    }

    // if (!id) {
    //   return;
    // }
    // axios.get("/api/admins?id=" + id).then((response) => {
    //   setAdminInfo(response.data);
    // });
  }, [id]);
  console.log(categoryId);

  function goBack() {
    router.push("/categories");
  }
  async function deleteCategory() {
    if (categoryId) {
      await axios.delete("/api/categories2", {
        params: {
          id: categoryId,
        },
      });
      goBack();
    }
  }
  return (
    <Layout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: "hidden",
          margin: "8rem 1rem",
        }}
      >
        {categoryName && (
          <h1 className="text-center">
            Do you really want to delete category &nbsp;&quot;{categoryName}
            &quot;?
          </h1>
        )}
        <div className="flex gap-2 justify-center">
          <button onClick={deleteCategory} className="btn-red">
            Yes
          </button>
          <button className="btn-default" onClick={goBack}>
            NO
          </button>
        </div>
      </Box>
    </Layout>
  );
}
