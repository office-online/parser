import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import nodeExternals from 'rollup-plugin-node-externals';

const umdOutput = {
    name: "office",
    file: 'dist/index.js',
    sourcemap: true,
    format: 'umd',
    globals: {
        zip: '@zip.js/zip.js',
    }
};

export default args => {
    const config = {
        input: 'src/index.ts',
        output: [umdOutput],
        plugins: [
            nodeExternals(),
            typescript(),
        ],
    }

    if (args.environment === 'BUILD:production') {
        // 输出配置
        config.output = [umdOutput,
            {
                ...umdOutput,
                file: 'dist/index.min.js',
                plugins: [terser()]
            },
            {
                file: 'dist/index.esm.js',
                sourcemap: true,
                format: 'es',
            },
            {
                file: 'dist/index.esm.min.js',
                sourcemap: true,
                format: 'es',
                plugins: [terser()]
            }];
    }

    return config
};
