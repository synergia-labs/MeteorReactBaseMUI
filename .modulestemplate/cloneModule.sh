#!/bin/bash

origem=$1;
origem_LetraMaiuscula=`echo ${origem:0:1} | tr  '[a-z]' '[A-Z]'`${origem:1}
destino=$2;
destino_LetraMaiuscula=`echo ${destino:0:1} | tr  '[a-z]' '[A-Z]'`${destino:1}

cp -a $origem $destino
cd $destino
shopt -s globstar
rename -n "s/{origem}/{destino}/" **
rename "s/${origem}/${destino}/" **

rename -n "s/${origem_LetraMaiuscula}/${destino_LetraMaiuscula}/" **
rename "s/${origem_LetraMaiuscula}/${destino_LetraMaiuscula}/" **

find ./ -type f | xargs sed -i  "s/${origem}/${destino}/g"
find ./ -type f | xargs sed -i  "s/${origem_LetraMaiuscula}/${destino_LetraMaiuscula}/g"

mv ../${destino}/ ../../imports/modules/
