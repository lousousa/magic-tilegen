#!bin/sh
#v.0.0.4
uid=`grep -Po '(?<="uid": ")[^"]*' .buildrc`
s=0
h=0
i=0
while [ "$1" != "" ]; do
	case $1 in
		-i | --install)
			i=1
			;;
		-s | --start)
			s=1
			;;
		-h | --help)
			echo -e "\e[93m[HELP]"
			echo -e "\e[93m-i OR --install:\e[97m npm, bower \e[93mi\e[97mnstall"
			echo -e "\e[93m-s OR --start:\e[97m forever \e[93ms\e[97mtart (default behaviour: restart)"
			h=1
			;;
	esac
	shift
done
if [ $h == 0 ]; then
	echo -e "\e[38;5;51mgit pull\e[38;5;83m"
	git pull
	if [ $i == 1 ]; then
		echo -e "\e[38;5;51mnpm install\e[38;5;83m"
		npm install
		echo -e "\e[38;5;51mbower install --allow-root\e[38;5;83m"
		bower install --allow-root
	fi
	echo -e "\e[38;5;51mgulp build\e[38;5;83m"
	gulp build
fi
if [ "$uid" != "" ]; then
	if [ $s == 1 ]; then
		echo -e "\e[38;5;51mforever start -a --uid $uid --spinSleepTime 10000 index.js\e[38;5;83m"
		forever start -a --uid $uid --spinSleepTime 10000 index.js
	else
		if [ $h == 0 ]; then
			echo -e "\e[38;5;51mforever restart $uid\e[38;5;83m"
			forever restart $uid
		fi
	fi
fi