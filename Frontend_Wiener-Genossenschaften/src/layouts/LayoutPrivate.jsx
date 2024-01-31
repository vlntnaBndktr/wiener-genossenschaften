import React from 'react';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import myTheme from '../styles/theme';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import PrivateStatic from '../views/PrivateStatic';
import Footer from '../components/Footer';

/*LayoutMain = eine Layout-Komponente, die meinen Content in zwei Teile teilt: links und rechts. 
Sie nimmt zwei Props entgegen (leftContent und rightContent), 
die dann mit spezifischem Inhalt befüllt werden können.*/

const LayoutPrivate = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <Grid container sx={{ height: '100vh', border: '5px solid blue' }}>
        <CssBaseline />
        {/* Left Side: */}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={4}
          sx={{
            backgroundColor: (t) => t.palette.secondary.main,
            overflow: 'hidden',
            border: '5px solid yellow',
            // backgroundSize: '80vh',
          }}
        >
          <Grid container border="10px solid grey" height={'100vh'}>
            <PrivateStatic />
            <Grid
              container
              border="10px solid green"
              py={4}
              px={4}
              sx={{
                backgroundColor: (t) => t.palette.primary.dark,
              }}
            >
              <Footer />
            </Grid>
          </Grid>
          <Grid
            container
            border="10px solid darkgrey"
            sx={{
              backgroundColor: (t) => t.palette.primary.dark,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque cum
            repudiandae quam earum corporis repellendus asperiores vel
            praesentium aut maiores perferendis animi quia repellat, rerum
            accusamus! A tempora autem ducimus suscipit, ex, fugit, hic rem enim
            beatae labore ab veritatis tenetur provident maxime quo eos
            repudiandae commodi sequi. Architecto ullam eum ea voluptatem?
            Necessitatibus accusamus, tempora provident eveniet aliquam
            similique delectus debitis doloremque nobis, quae qui ipsam impedit
            maiores itaque labore blanditiis. Nesciunt reprehenderit consequatur
            accusamus inventore numquam a provident veniam vel dolore! Qui ut
            tempore voluptatum natus vitae tenetur provident voluptas eos
            deserunt vel, a fuga laudantium iste veritatis esse dolorum saepe
            beatae aut nemo ab accusamus unde minima ex neque? Nesciunt deserunt
            ipsa minus adipisci molestias doloribus voluptas! Aliquid, adipisci
            doloribus illum deserunt eius officiis! Illo animi ex ut quas
            repellendus aut voluptatem nam? Eveniet molestias praesentium
            cupiditate placeat sapiente nostrum deserunt dignissimos eos
            explicabo quia rerum dolores doloremque eum soluta cum excepturi
            consequuntur amet, minima blanditiis iste incidunt labore ratione
            repellat aut! Odit distinctio tenetur laudantium quaerat quia
            expedita iste error velit, aliquid sapiente commodi dignissimos
            ducimus ab sunt quisquam veritatis? Eius tempora, dignissimos ex
            illo dolores repellat iusto voluptatum quo nostrum ut ipsa, dicta
            sequi officiis quisquam animi delectus voluptas in aperiam fuga unde
            ea est eveniet placeat. Nemo in aperiam accusantium voluptatem
            suscipit? Vel consequatur id nesciunt modi! Vel, accusantium magnam.
            Perferendis laboriosam sed obcaecati modi. Dolorum neque quos sed
            atque sapiente repudiandae rem dicta quod ea nam, unde nostrum vel
            dolore cum, veritatis reprehenderit suscipit consequatur aspernatur
            error? Quia ullam quos aliquid. Reiciendis dolores voluptatibus
            animi accusantium autem soluta nisi quam sapiente asperiores
            consequatur dignissimos molestias deleniti, provident expedita
            pariatur beatae, cupiditate maxime facilis quia veritatis ipsa
            delectus et unde. Minima laudantium cumque eligendi aspernatur
            adipisci eum delectus tempore blanditiis itaque! Tempora perferendis
            doloribus voluptatum dolores harum, iure, corporis cum illo aperiam
            delectus et unde. Minima laudantium cumque eligendi aspernatur
            adipisci eum delectus tempore blanditiis itaque! Tempora perferendis
            doloribus voluptatum dolores harum, iure, corporis cum illo aperiam
          </Grid>
        </Grid>
        {/* End*/}
        {/* Right Content */}

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={8}
          sx={{ backgroundColor: (t) => t.palette.primary.light }}
        >
          <ResponsiveAppBar />
          <Outlet />
        </Grid>
        {/* End*/}
      </Grid>
    </ThemeProvider>
  );
};

export default LayoutPrivate;
