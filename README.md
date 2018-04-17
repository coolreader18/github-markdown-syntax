# github-markdown-syntax
An easy way to syntax highlight any language supported by GitHub into HTML.

## Installation
```bash
yarn add github-markdown-syntax
# or
npm i github-markdown-syntax
```

## Usage
```js
const GFMSyntax = require("github-markdown-syntax");
GFMSyntax([
  {
    code: 'console.log("Hello World!");',
    lang: "js"
  },
  {
    code:
`edit : main.o kbd.o command.o display.o \
       insert.o search.o files.o utils.o
        cc -o edit main.o kbd.o command.o display.o \
                   insert.o search.o files.o utils.o

main.o : main.c defs.h
        cc -c main.c
kbd.o : kbd.c defs.h command.h
        cc -c kbd.c
command.o : command.c defs.h command.h
        cc -c command.c`, // from https://www.gnu.org/software/make/manual/html_node/Simple-Makefile.html
    lang: "makefile"
  },
  {
    code:
`ScriptName MyFirstScript extends Quest
{This is my first script.
It prints the message "Hello, World!" to the screen once.}

Event OnInit()
	Debug.Notification("Hello, World!")
EndEvent`, // just random languages taken from linguist/linguist/grammars.yml,
           // code from http://www.cipscis.com/skyrim/tutorials/beginners.aspx
    lang: "papyrus"
  },
  {
    code:
`: main[ -- ]
me @ "Hello world!" notify
exit
;`,
    lang: "muf"
  }
]).then(console.log); // logs:
[ '<div class="highlight highlight-source-js"><pre><span class="pl-en">console</span>.<span class="pl-c1">log</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>Hello World!<span class="pl-pds">&quot;</span></span>);</pre></div>',
  '<div class="highlight highlight-source-makefile"><pre><span class="pl-en">edit</span> : main.o kbd.o command.o display.o        insert.o search.o files.o utils.o\n        cc -o edit main.o kbd.o command.o display.o                    insert.o search.o files.o utils.o\n\n<span class="pl-en">main.o</span> : main.c defs.h\n        cc -c main.c\n<span class="pl-en">kbd.o</span> : kbd.c defs.h command.h\n        cc -c kbd.c\n<span class="pl-en">command.o</span> : command.c defs.h command.h\n        cc -c command.c</pre></div>',
  '<div class="highlight highlight-source-papyrus-skyrim"><pre><span class="pl-k">ScriptName</span> <span class="pl-k">MyFirstScript</span> <span class="pl-k">extends</span> <span class="pl-k">Quest</span>\n<span class="pl-c">{This is my first script.</span>\n<span class="pl-c">It prints the message &quot;Hello, World!&quot; to the screen once.}</span>\n\n<span class="pl-k">Event</span> <span class="pl-en">OnInit</span>()\n\t<span class="pl-smi">Debug</span><span class="pl-k">.</span><span class="pl-smi">Notification</span>(<span class="pl-s">&quot;Hello, World!&quot;</span>)\n<span class="pl-k">EndEvent</span></pre></div>',
  '<pre lang="muf"><code>: main[ -- ]\nme @ &quot;Hello world!&quot; notify\nexit\n;\n</code></pre>' ]
```

## License
This project is licensed under the MIT license. For more information, see the LICENSE file.
