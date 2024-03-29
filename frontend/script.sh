#!/bin/bash

if [ $# -lt 1 ]; then
	echo "No commit message"
	exit 1
fi

count1=0
echo "" > README.md
echo "| C# written lines | ReactJS written lines | CSS/SCSS written lines | Total written lines | " >> README.md
echo "| :---: | :---: | :---: | :---: | " >> README.md

for f in $(find backend -maxdepth 3 -type f | grep -E ".*(\.cs)$" ); do
	lines=`wc -l "$f" | cut -d' ' -f1`
	count1=$(($count1+$lines))
done

count2=0
for f in $(find src -type f | grep -E ".*(\.[tj]s(x)?)$"); do
	lines=`wc -l "$f" | cut -d' ' -f1`
	count2=$(($count2+$lines))
done


count3=0
for f in $(find src -type f | grep -E ".*(\.s?css)$"); do
	lines=`wc -l "$f" | cut -d' ' -f1`
	count3=$(($count3+$lines))
done

echo -n "| ``$count1`` | ``$count2`` | ``$count3`` | ``$(($count1+$count2+$count3))``|" >> README.md
git add .
git commit -m "$1"
git push 
