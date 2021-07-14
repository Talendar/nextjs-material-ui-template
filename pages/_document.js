import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";
import theme from "../themes/default_theme";


export default class MyDocument extends Document {

    /**
     * Enables server-side rendering (SSR).
     *
     * Allows you to do initial data population, it means sending the page with the data already populated from the
     * server. This is especially useful for SEO.
     *
     * Since the app uses SSR, `renderPage` is customized here to ensure the app's compatibility with Material UI (it
     * uses css-in-js). It's important to provide the page with the required CSS, otherwise the page will render with
     * just the HTML then wait  for the CSS to be injected by the client, causing it to flicker (FOUC).
     * `getInitialProps` belongs to `_document` (instead of `_app`), since it's compatible with Static Generation
     * (server-side generation or SSG).
     *
     * @param ctx Context with a `renderPage` callback.
     */
    static async getInitialProps(ctx) {
        // Resolution order
        //
        // On the server:
        // 1. app.getInitialProps
        // 2. page.getInitialProps
        // 3. document.getInitialProps
        // 4. app.render
        // 5. page.render
        // 6. document.render
        //
        // On the server with error:
        // 1. document.getInitialProps
        // 2. app.render
        // 3. page.render
        // 4. document.render
        //
        // On the client
        // 1. app.getInitialProps
        // 2. page.getInitialProps
        // 3. app.render
        // 4. page.render

        // Create a fresh, new ServerStyleSheets instance on every request
        const sheets = new ServerStyleSheets();

        // Render the React tree with the server-side collector and pull the CSS out
        const originalRenderPage = ctx.renderPage;
        ctx.renderPage = () => originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });

        // Pass the CSS along to the client
        // (on the client side, the CSS will be injected a second time before removing the server-side injected CSS)
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            // Styles fragment is rendered after the app and page rendering finish
            styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
        };
    }

    /**
     * Overrides the default document's structure.
     */
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* PWA primary color */}
                    <meta name="theme-color" content={theme.palette.primary.main} />

                    {/* Roboto font */}
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}