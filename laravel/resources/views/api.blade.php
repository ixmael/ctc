<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Cuida Tu Comunidad</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <style>
        /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */
        button,
        hr,
        input {
            overflow: visible
        }

        progress,
        sub,
        sup {
            vertical-align: baseline
        }

        [type=checkbox],
        [type=radio],
        legend {
            box-sizing: border-box;
            padding: 0
        }

        html {
            line-height: 1.15;
            -webkit-text-size-adjust: 100%
        }

        body {
            margin: 0
        }

        details,
        main {
            display: block
        }

        h1 {
            font-size: 2em;
            margin: .67em 0
        }

        hr {
            box-sizing: content-box;
            height: 0
        }

        code,
        kbd,
        pre,
        samp {
            font-family: monospace, monospace;
            font-size: 1em
        }

        a {
            background-color: transparent
        }

        abbr[title] {
            border-bottom: none;
            text-decoration: underline;
            text-decoration: underline dotted
        }

        b,
        strong {
            font-weight: bolder
        }

        small {
            font-size: 80%
        }

        sub,
        sup {
            font-size: 75%;
            line-height: 0;
            position: relative
        }

        sub {
            bottom: -.25em
        }

        sup {
            top: -.5em
        }

        img {
            border-style: none
        }

        button,
        input,
        optgroup,
        select,
        textarea {
            font-family: inherit;
            font-size: 100%;
            line-height: 1.15;
            margin: 0
        }

        button,
        select {
            text-transform: none
        }

        [type=button],
        [type=reset],
        [type=submit],
        button {
            -webkit-appearance: button
        }

        [type=button]::-moz-focus-inner,
        [type=reset]::-moz-focus-inner,
        [type=submit]::-moz-focus-inner,
        button::-moz-focus-inner {
            border-style: none;
            padding: 0
        }

        [type=button]:-moz-focusring,
        [type=reset]:-moz-focusring,
        [type=submit]:-moz-focusring,
        button:-moz-focusring {
            outline: ButtonText dotted 1px
        }

        fieldset {
            padding: .35em .75em .625em
        }

        legend {
            color: inherit;
            display: table;
            max-width: 100%;
            white-space: normal
        }

        textarea {
            overflow: auto
        }

        [type=number]::-webkit-inner-spin-button,
        [type=number]::-webkit-outer-spin-button {
            height: auto
        }

        [type=search] {
            -webkit-appearance: textfield;
            outline-offset: -2px
        }

        [type=search]::-webkit-search-decoration {
            -webkit-appearance: none
        }

        ::-webkit-file-upload-button {
            -webkit-appearance: button;
            font: inherit
        }

        summary {
            display: list-item
        }

        [hidden],
        template {
            display: none
        }
    </style>
    <style>
        body {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
            background-color: #eee;
        }

        .content {
            width: 500px;
            padding: 1rem;
        }

        h1 {
            text-align: center;
            text-transform: uppercase;
        }

        li {
            margin-bottom: 1rem;
        }
    </style>
</head>

<body class="antialiased">
    <div class="content">
        <h1>Cuida Tu Comunidad</h1>
        <p>This is the RestAPI for the CTC web application.</p>
        <ul>
            <li>
                The RestAPI is in <a href="/api/v1/">RestAPI</a>
            </li>
            <li>
                The RestAPI docs is in <a href="/api/documentation">RestAPI documents</a>
            </li>
            <li>
                The repository of this project is in <a href="https://github.com/ixmael/ctc">Repository</a>
            </li>
        </ul>
    </div>
</body>

</html>
