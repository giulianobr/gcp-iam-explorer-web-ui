import {
  Box,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import _ from "lodash";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import { specialRoleNames } from "../../constants";
import { roles, services } from "../../lib/roles";
import Role from "../../types/Role";

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: 800,
  },
  verticalText: {
    writingMode: "vertical-lr",
  },
}));

type RoleTableProps = {
  service: string;
  filteredRoles: Role[];
  relatedPermissons: string[];
};

const PermissionTable: React.FC<RoleTableProps> = ({
  service,
  filteredRoles,
  relatedPermissons,
}) => {
  const classes = useStyles();

  return (
    <Layout>
      <Box component={Paper} p={2}>
        <Head>
          <title>{service} : GCP IAM Explorer</title>
          <meta property="og:title" content={`${service} : GCP IAM Explorer`} />
        </Head>
        <TableContainer className={classes.container}>
          <Table
            size="small"
            aria-label="simple table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell>Permission</TableCell>
                {filteredRoles.map((role) => (
                  <TableCell key={role.name}>
                    <span className={classes.verticalText}>
                      {role.name.replace(`roles/${service}.`, "")}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {relatedPermissons.map((permission) => (
                <TableRow key={permission}>
                  <TableCell>{permission}</TableCell>
                  {filteredRoles.map((role) => (
                    <TableCell key={role.name}>
                      {role.includedPermissions.includes(permission) ? "✔" : ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout >
  );
};

type PathParams = {
  service: string;
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  return {
    paths: services.map((service) => ({ params: { service } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  RoleTableProps,
  PathParams
// eslint-disable-next-line @typescript-eslint/require-await
> = async ({ params }) => {
  if (!params) throw new Error("never");

  const { service } = params;

  const filteredRoles = (service === "project"
    ? roles.filter((role) => specialRoleNames.includes(role.name))
    : roles.filter((role) => role.name.startsWith(`roles/${service}.`))
  ).sort((a, b) => b.includedPermissions.length - a.includedPermissions.length);

  const relatedPermissons = _.chain(filteredRoles)
    .flatMap((role) => role.includedPermissions)
    .uniq()
    .sort()
    .value();

  return {
    props: {
      service,
      filteredRoles,
      relatedPermissons,
    },
  };
};

export default PermissionTable;
