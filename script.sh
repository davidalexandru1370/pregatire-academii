#!/bin/bash

count1=0
echo "" > README.md
echo "| C# written lines | ReactJS written lines | Total written lines | " >> README.md
echo "| :---: | :---: | :---: | " >> README.md

for f in $(find backend -maxdepth 3 -type f | grep -E ".*(\.cs)$" ); do
	lines=`wc -l "$f" | cut -d' ' -f1`
	count1=$(($count1+$lines))
done
		#echo "C# written lines $count1"

count2=0
for f in $(find src -type f | grep -E ".*(\.jsx?)$"); do
	lines=`wc -l "$f" | cut -d' ' -f1`
	count2=$(($count2+$lines))
done

#	echo "ReactJs written lines $count2"
echo -n "| ``$count1`` | ``$count2`` | ``$(($count1+$count2))``|" >> README.md

git push 