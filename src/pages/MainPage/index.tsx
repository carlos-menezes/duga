import { Box, Grid2, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { isNil, isUndefined } from "lodash";
import { useEffect, useState } from "react";
import { AppLayout } from "../../layouts/AppLayout";
import { theme } from "../../lib/mui";
import {
  getLivestreamsCategories,
  getSeriesCategories,
  getVodCategories,
  TGetCategoryReturnType,
} from "../../lib/xtream/categories";
import { useCredentialStore } from "../../store/CredentialStore";
import { CategorySelect } from "./components/CategorySelect";
import { LivestreamsTabContent } from "./components/TabContent/LivestreamsTabContent";

const MainPage = () => {
  const credentialStore = useCredentialStore();

  const [selectedCategoryTab, setSelectedCategoryTab] = useState<number>();
  const [selectedSubcategoryTab, setSelectedSubcategoryTab] =
    useState<number>();

  const { data: livestreamsCategories, error: livestreamsCategoriesError } =
    useQuery({
      queryKey: ["livestreamsCategories"],
      queryFn: async () => {
        if (!credentialStore.activeCredential) return;

        return getLivestreamsCategories({
          credential: credentialStore.activeCredential,
        });
      },
      initialData: [],
    });

  const { data: vodCategoriesData, error: vodCategoriesError } = useQuery({
    queryKey: ["vodCategories"],
    queryFn: async () => {
      if (!credentialStore.activeCredential) return;

      return getVodCategories({
        credential: credentialStore.activeCredential,
      });
    },
    initialData: [],
  });

  const { data: seriesCategoriesData, error: seriesCategoriesError } = useQuery(
    {
      queryKey: ["seriesCategories"],
      queryFn: async () => {
        if (!credentialStore.activeCredential) return;

        return getSeriesCategories({
          credential: credentialStore.activeCredential,
        });
      },
      initialData: [],
    }
  );

  useEffect(() => {
    setSelectedSubcategoryTab(0); // Automatically select the first subcategory when the category changes
  }, [selectedCategoryTab]);

  /**
   * Maps the tab index to the category data (displayed as the third navigation bar).
   */
  const categoryDataMap: Record<number, TGetCategoryReturnType | undefined> = {
    0: livestreamsCategories,
    1: vodCategoriesData,
    2: seriesCategoriesData,
  };

  if (livestreamsCategoriesError || vodCategoriesError || seriesCategoriesError)
    return (
      <AppLayout
        slots={{
          header: {
            back: {
              href: "/",
            },
          },
          main: {
            component: (
              <Box
                height="100%"
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >
                <Typography
                  variant="overline"
                  fontWeight={theme.typography.fontWeightBold}
                >
                  There was an error loading the categories.
                </Typography>
                <Typography variant="overline">
                  VERIFY YOUR CREDENTIALS AND/OR YOUR CONNECTION.
                </Typography>
              </Box>
            ),
          },
        }}
      />
    );

  return (
    <AppLayout
      slots={{
        header: {
          back: {
            href: "/",
          },
        },
        main: {
          component: (
            <Grid2 container overflow="hidden" height="100%">
              <Grid2
                size={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CategorySelect
                  selectedTab={selectedCategoryTab}
                  setSelectedTab={setSelectedCategoryTab}
                  labels={[
                    {
                      name: "Livestreams",
                    },
                    {
                      name: "Movies",
                      disabled: true,
                    },
                    {
                      name: "Series",
                      disabled: true,
                    },
                  ]}
                />
              </Grid2>
              <Grid2
                sx={{
                  width: "100%",
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  background: theme.palette.background.paper,
                }}
              >
                {isUndefined(selectedCategoryTab) ? (
                  <CategorySelect
                    labels={[
                      {
                        name: "SELECT A CATEGORY FIRST",
                        disabled: true,
                      },
                    ]}
                  />
                ) : (
                  <CategorySelect
                    selectedTab={selectedSubcategoryTab}
                    setSelectedTab={setSelectedSubcategoryTab}
                    labels={categoryDataMap[selectedCategoryTab]!.map(
                      ({ category_name }) => ({
                        name: category_name,
                      })
                    )}
                  />
                )}
              </Grid2>
              <Grid2 height="100%" flexGrow={1} size={12}>
                {!isNil(selectedCategoryTab) &&
                  !isNil(selectedSubcategoryTab) &&
                  categoryDataMap[selectedCategoryTab] && (
                    <LivestreamsTabContent
                      categoryId={Number(
                        categoryDataMap[selectedCategoryTab][
                          selectedSubcategoryTab
                        ].category_id
                      )}
                    />
                  )}
              </Grid2>
            </Grid2>
          ),
        },
      }}
    />
  );
};

export { MainPage };
