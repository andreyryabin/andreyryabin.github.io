<?php


function memoimagemap($opts) {

    $ROOT_DIR = $opts['ROOT_DIR'];
    $WEB_DIR = $opts['WEB_DIR'];
    $MAP_FILE = $opts['MAP_FILE'];

    $iterator = new DirectoryIterator($ROOT_DIR);
    $exts = [
        IMAGETYPE_JPEG => 'jpg',
        IMAGETYPE_PNG => 'png',
    ];

    $ts = time();

    $map = [];

    $index = 0;
    foreach ($iterator as $item) {

        if ($item->isFile()) {
            $index++;


            $oldpathname = $item->getPathname();

            $type = exif_imagetype($oldpathname);


            if (isset($exts[$type])) {
                $basename = $item->getBasename('.' . $exts[$type]);

                if (preg_match('@img-\d+-\d+@', $basename)) {
                    $imagename = $basename . '.' . $exts[$type];

                } else {
                    $imagename = 'img-' . $ts . '-' . $index . '.' . $exts[$type];
                    rename($oldpathname, $ROOT_DIR . '/' . $imagename);
                    fwrite(STDOUT, 'rename ' . $imagename . PHP_EOL);
                }

                $map[] = $WEB_DIR . $imagename;

            } else {
                unlink($oldpathname);
            }
        }
    }


    file_put_contents($MAP_FILE, 'var memoimages = ' . json_encode($map,JSON_PRETTY_PRINT) . ';');

    fwrite(STDOUT, 'mapitems: ' . count($map) . PHP_EOL);
}