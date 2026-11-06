// Directus simulado para probar el proyecto sin una instancia real (CI y pruebas locales).
//   node scripts/mock-directus.mjs            # escucha en el puerto 8055 (o MOCK_DIRECTUS_PORT)
// Usa DIRECTUS_URL=http://127.0.0.1:8055 y un DIRECTUS_TOKEN cualquiera.
import http from 'node:http';

const PORT = Number(process.env.MOCK_DIRECTUS_PORT ?? 8055);

// PNG de 64x64 (degradado azul): suficiente para comprobar que la foto llega al PDF
const PHOTO_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAApRklEQVR4nA2XbVObCru2/WGO4ziO4ziOk8lkMplMJjs7d+6srKysLEoppZRSioiIiIiIiIiIiIiIiIiUpmmapmmaZmW93W977+fHPP1yfb4+nNd5HcfMbOb/zWX+bz7zvwuZ/1nM/Gcp8+/lzL9WMv9czfxjLfNXJvNnNvNHLvN7PvNbITMtZn4tZSblzLdKZlzNfK1lRvXMl0Zm2Mx8bmUG7cwnINMHMx+hTA/OfEAyXTTzHst08Mw7IpOSmbdUJqEzj0wmZjMPXCbiM/dCJhQzd1ImkDO3SsZXMzdaxtMz10bGNTNXVsaxM5dOxnYzF17G8jPnQcYMM2dRxogzp0lGTzMnM7PZ/5vL/u989n8Wsv9ZzP57Kfuv5ew/V7L/WM3+tZb9M5P9I5v9PZf9LZ+dFrK/FrOTUvZbOTuuZL9Ws6Na9ks9O2xkPzezg1b2UzvbB7IfwWwPyn6As10k+x7NdrDsOzybEtm3ZDahso90NmayD2w24rL3fDYUsndiNpCyt3LWV7I3atbTstd61jWyV2bWsbKXdtZ2shdu1vKy537WDLJnYdaIsqdxVk+yJ2lWm5nN/e9c7n/mc/9ZyP17Mfevpdw/l3P/WMn9tZr7cy33Ryb3ezb3Wy43zed+LeQmxdy3Um5czn2t5EbV3JdabljPfW7kBs3cp1au3859BHI9MPcBynXh3Hsk10Fz77BciufeErmEzD1SuZjOPTC5iM3dc7mQz90JuUDM3Uo5X87dKDlPzV1rOVfPXRk5x8xdWjnbzl04OcvNnXs508+dBTkjzJ1GOT3OnSQ5Lc0dz8zm/2cu/5/5/L8X8v9azP9zKf+P5fxfK/k/V/N/rOV/z+R/y+anufyv+fykkP9WzI9L+a/l/KiS/1LND2v5z/X8oJH/1Mz3W/mP7XwPyH8A810o/x7Od5D8OzSfYvm3eD4h8o9kPqbyD3Q+YvL3bD7k8nd8PhDyt2Lel/I3ct5T8tdq3tXyV3reMfKXZt628hd23nLy527e9PJnft4I8qdhXo/yJ3FeS/LHaV6dmS38Z67w7/nCvxYK/1ws/GOp8Ndy4c+Vwh+rhd/XCr9lCtNs4ddcYZIvfCsUxsXC11JhVC58qRSG1cLnWmFQL3xqFPrNwsdWodcufAAKXbDwHip04MI7pJCihbdYIcELj0QhJgsPVCGiC/dMIWQLd1wh4Au3QsEXCzdSwZML10rBVQtXWsHRC5dGwTYLF1bBsgvnTsF0C2dewfALp0FBDwsnUUGLC8dJQU0LRzOzxX/PFf81X/znQvEfi8W/lop/Lhf/WCn+vlr8ba04zRR/zRYnueK3fHFcKH4tFkel4pdycVgpfq4WB7Xip3qx3yh+bBZ7reKHdrELFN+DxQ5UfAcXU6T4Fi0mWPERL8ZE8YEsRlTxni6GTPGOLQZc8ZYv+kLxRix6UvFaLrpK8UotOlrxUi/aRvHCLFpW8dwumk7xzC0aXvHUL+pB8SQsalHxOC6qSfEoLSozs6V/zZX+OV/6x0Lpr8XSn0ulP5ZLv6+UflstTddKv2ZKk2zpW640zpe+FkqjYulLqTQslz5XSoNq6VOt1K+XPjZKvWbpQ6vUbZfeA6UOWHoHlVK49BYpJWjpESvFeOmBKEVk6Z4qhXTpjikFbOmWK/l86UYoeWLpWiq5culKKTlq6VIr2XrpwihZZuncKpl26cwpGW7p1CvpfukkKGlh6TgqqXHpKCkpaelwZrb8z7nyP+bLfy2U/1ws/7FU/n25/NtKebpa/nWtPMmUv2XL41z5a748KpS/FMvDUvlzuTyolD9Vy/1a+WO93GuUPzTL3Vb5fbvcAcrvwHIKld/C5QQpP6LlGCs/4OWIKN+T5ZAq39HlgCnfsmWfK9/wZU8oX4tlVypfyWVHKV+qZVsrX+hlyyifm2XTKp/ZZcMpn7pl3Suf+GUtKB+HZTUqH8VlJSkfpmV5Zrbyj7nKX/OVPxcqfyxWfl+q/LZcma5Ufl2tTNYq3zKVcbbyNVcZ5StfCpVhsfK5VBmUK58qlX618rFW6dUrHxqVbrPyvlXptCvvgEoKVt5ClQSuPCKVGK08YJUIr9wTlZCs3FGVgK7cMhWfrdxwFY+vXAsVV6xcSRVHrlwqFVutXGgVS6+cGxXTrJxZFcOunDoV3a2ceBXNrxwHFTWsHEUVJa4cJhU5rRzMzFb/mqv+OV/9Y6H6+2L1t6XqdLn660p1slr9tlYdZ6pfs9VRrvolXx0Wqp+L1UGp+qlc7VeqH6vVXq36oV7tNqrvm9VOq/quXU2B6luwmkDVR7gaI9UHtBph1Xu8GhLVO7IaUNVbuuoz1Ru26nHVa77qCtUrsepI1Uu5aivVC7VqadVzvWoa1TOzaljVU7uqO9UTt6p51WO/qgbVo7CqRNXDuCon1YO0Ks3M1v6cq/0xX/t9ofbbYm26VPt1uTZZqX1brY3Xal8ztVG29iVXG+Zrnwu1QbH2qVTrl2sfK7VetfahVuvWa+8btU6z9q5VS9u1t0AtAWuPUC2Gaw9ILUJr91gtxGt3RC0ga7dUzadrN0zNY2vXXM3la1dCzRFrl1LNlmsXSs1Sa+dazdRrZ0bNMGunVk23aydOTXNrx15N9WtHQU0Ja4dRTY5rB0lNSmv7M7P1P+bqv8/Xf1uoTxfrvy7VJ8v1byv18Wr961p9lKl/ydaHufrnfH1QqH8q1vul+sdyvVepf6jWu7X6+3q906i/a9bTVv1tu54A9UewHkP1B7geIfV7tB5i9Tu8HhD1W7LuU/Ubuu4x9Wu27nL1K77uCPVLsW5L9Qu5bin1c7VuavUzvW4Y9VOzrlv1E7uuOfVjt6569SO/rgT1w7AuR/WDuC4l9f20Ls7MNn6fa/w235guNH5dbEyWGt+WG+OVxtfVxmit8SXTGGYbn3ONQb7xqdDoFxsfS41eufGh0uhWG+9rjU698a7RSJuNt61G0m48Ao0YbDxAjQhu3CONEG3cYY0Ab9wSDZ9s3FANj25cMw2XbVxxDYdvXAoNW2xcSA1LbpwrDVNtnGkNQ2+cGg3dbJxYDc1uHDsN1W0ceQ3FbxwGDTlsHEQNKW7sJw0xbezNzDZ/m2tO55u/LjQni81vS83xcvPrSnO02vyy1hxmmp+zzUGu+Snf7BeaH4vNXqn5odzsVprvq81Orfmu3kwbzbfNZtJqPrabMdB8AJsR1LyHmyHSvEObAda8xZs+0bwhmx7VvKabLtO8YpsO17zkm7bQvBCbltQ8l5um0jxTm4bWPNWbutE8MZua1Ty2m6rTPHKbitc89Jty0DwIm1LU3I+bYtLcS5vCzGxrOtf6db41WWh9W2yNl1pfl1ujldaX1dZwrfU50xpkW59yrX6+9bHQ6hVbH0qtbrn1vtLqVFvvaq203nrbaCXN1mOrFbdbD0ArAlv3UCuEW3dIK0Bbt1jLx1s3RMsjW9dUy6VbV0zLYVuXXMvmWxdCyxJb51LLlFtnSstQW6daS9dbJ0ZLM1vHVku1W0dOS3Fbh15L9lsHQUsKW/tRS4xbe0lLSFu7M7PtX+fak/n2t4X2eLH9dak9Wm5/WWkPV9uf19qDTPtTtt3PtT/m271C+0Ox3S2135fbnUr7XbWd1tpv6+2k0X5stuNW+6HdjoD2PdgOofYd3A6Q9i3a9rH2Dd72iPY12Xap9hXddpj2Jdu2ufYF37aE9rnYNqX2mdw2lPap2ta19one1oz2sdlWrfaR3Vac9qHblr32gd+WgvZ+2Baj9l7cFpL2btrmZ2aByRzwbR4YLwBfF4HREvBlGRiuAJ9XgcEa8CkD9LPAxxzQywMfCkC3CLwvAZ0y8K4CpFXgbQ1I6sBjA4ibwEMLiNrAPQCEIHAHAQEM3CKAjwI3GODhwDUBuCRwRQEODVwygM0CFxxg8cC5AJgicCYBhgycKoCuAicaoOnAsQGoJnBkAYoNHDqA7AIHHiD5wH4AiCGwFwFCDOwmAJ8COzOz4Lc5cDwPfl0AR4vglyVwuAx+XgEHq+CnNbCfAT9mwV4O/JAHuwXwfRHslMB3ZTCtgG+rYFIDH+tg3AAfmmDUAu/bYAiAdyAYQOAtDPoIeIOCHgZe46BLgFck6FDgJQ3aDHjBghYHnvOgKYBnImhI4KkM6gp4ooKaBh7roGqARyaoWOChDcoOeOCCkgfu+6AYgHshKETgbgzyCbiTgtzMLDSeg77OQ6MF6MsiNFyCPi9DgxXo0yrUX4M+ZqBeFvqQg7p56H0B6hShdyUoLUNvK1BShR5rUFyHHhpQ1ITuW1DYhu4AKAChWwjyYegGgTwUusYgF4euCMghoUsKsmnogoEsFjrnIJOHzgTIEKFTCdJl6ESBNBU61iBVh44MSDGhQwuSbejAgSQX2vcg0Yf2AkgIod0I4mNoJ4G4FNqemYW/zsGjefjLAjxchD8vwYNl+NMK3F+FP67BvQz8IQt3c/D7PNwpwO+KcFqC35bhpAI/VuG4Bj/U4agB3zfhsAXfteEAgG9B2IfgGxj2EPgahV0MvsJhh4AvSdim4Asathj4nIVNDj7jYUOAT0VYl+ATGdYU+FiFVQ0+0mHFgA9NWLbgAxuWHHjfhUUP3vNhIYB3Q5iP4J0Y5hJ4O4XZmVlkNId8mUeGC8jnRWSwhHxaRvoryMdVpLeGfMgg3SzyPod08si7ApIWkbclJCkjjxUkriIPNSSqI/cNJGwidy0kaCO3AOKDyA2EeDByjSAuilxhiIMjlwRik8gFhVg0cs4gJouccYjBI6cCoovIiYRoMnKsIKqKHGmIoiOHBiKbyIGFSDay7yCii+x5iOAjuwHCh8hOhHAxsp0gbIpszcyiX+bQ4Tz6eQEdLKKfltD+MvpxBe2toh/W0G4GfZ9FOzn0XR5NC+jbIpqU0McyGlfQhyoa1dD7Oho20LsmGrTQ2zbqA+gNiHoQeg2jLoJeoaiDoZc4ahPoBYlaFHpOoyaDnrGowaGnPKoL6ImIahJ6LKOqgh6pqKKhhzoqG+iBiUoWum+jooPuuajgobs+ygfoTohyEbodo2yCbqUoMzOLDeewz/PYYAH7tIj1l7CPy1hvBfuwinXXsPcZrJPF3uWwNI+9LWBJEXssYXEZe6hgURW7r2FhHbtrYEETu21hfhu7ATAPxK4hzIWxKwRzUOwSw2wcuyAwi8TOKcyksTMGM1jslMN0HjsRME3EjiVMlbEjBVNU7FDDZB07MDDJxPYtTLSxPQcTXGzXw3gf2wkwLsS2I4yNsa0EY1Jsc2YW/zyHD+bxTwt4fxH/uIT3lvEPK3h3FX+/hncy+Lssnubwt3k8KeCPRTwu4Q9lPKrg91U8rOF3dTxo4LdN3G/hN23cA/BrEHch/ArGHQS/RHEbwy9w3CLwcxI3KfyMxg0GP2VxncNPeFwT8GMRVyX8SMYVBT9UcVnDD3RcMvB9ExctfM/GBQffdXHew3d8nAvw7RBnI3wrxpkE30xxemaWGMwRn+aJ/gLxcZHoLREflonuCvF+leisEe8yRJol3uaIJE88Foi4SDyUiKhM3FeIsErc1YigTtw2CL9J3LQIr01cA4QLElcQ4cDEJULYKHGBERZOnBOESRJnFGHQxClD6CxxwhEaTxwLhCoSRxKhyMShQsgqcaARkk7sG4RoEnsWIdjErkPwLrHjEZxPbAcEGxJbEcHExGZC0CmxMTNLfpoj+/PkxwWyt0h+WCK7y+T7FbKzSr5bI9MM+TZLJjnyMU/GBfKhSEYl8r5MhhXyrkoGNfK2TvoN8qZJei3yuk26AHkFkg5EXsKkjZAXKGlh5DlOmgR5RpIGRZ7SpM6QJyypceQxT6oCeSSSikQeyqSskAcqKWnkvk6KBrlnkoJF7tok75A7Lsl55LZPsgG5FZJMRG7GJJ2QGylJzcxS/Tnq4zzVW6A+LFLdJer9MtVZod6tUuka9TZDJVnqMUfFeeqhQEVF6r5EhWXqrkIFVeq2Rvl16qZBeU3qukW5beoKoByQuoQoG6YuEMpCqXOMMnHqjKAMkjqlKJ2mThhKY6ljjlJ56kigFJE6lChZpg4USlKpfY0SdWrPoAST2rUo3qZ2HIpzqW2PYn1qK6CYkNqMKDqmNhKKSqn1mVn64xzdm6c/LNDdRfr9Et1Zpt+t0Okq/XaNTjL0Y5aOc/RDno4K9H2RDkv0XZkOKvRtlfZr9E2d9hr0dZN2W/RVm3YA+hKkbYi+gGkLoc9R2sToM5w2CPqUpHWKPqFpjaGPWVrl6COeVgT6UKRliT6QaUmh91Va1Og9nRYMetekeYvesWnOobddmvXoLZ9mAnozpOmI3ohpKqHXU5qcmWV6c8yHeaa7wLxfZDpLzLtlJl1h3q4yyRrzmGHiLPOQY6I8c19gwiJzV2KCMnNbYfwqc1NjvDpz3WDcJnPVYpw2cwkwNshcQIwFM+cIY6LMGcYYOHNKMDrJnFCMRjPHDKOyzBHHKDxzKDCyyBxIjCQz+wojqsyexgg6s2swvMnsWAxnM9sOw7rMlscwPrMZMHTIbEQMFTPrCUOmzJuZWfbDHNudZ98vsJ1F9t0Smy6zb1fYZJV9XGPjDPuQZaMce59nwwJ7V2SDEntbZv0Ke1NlvRp7XWfdBnvVZJ0We9lmbYC9AFkLYs9h1kTYM5Q1MPYUZ3WCPSFZjWKPaVZl2COWVTj2kGdlgT0QWUli92VWVNg9lRU0dldneYPdMVnOYrdtlnXYLZdlPHbTZ+mA3QhZKmLXY5ZM2DcpS8zMct057v0811ng3i1y6RL3dplLVrjHVS5e4x4yXJTl7nNcmOfuClxQ5G5LnF/mbiqcV+Wua5xb564anNPkLluc3eYuAM4CuXOIM2HuDOEMlDvFOB3nTghOI7ljilNp7ojhFJY75DiZ5w4EThK5fYkTZW5P4QSV29U4Xud2DI4zuW2LY21uy+EYl9v0ONrnNgKOCrn1iCNj7k3CESn3emaWfz/Hd+b5dwt8usi/XeKTZf5xhY9X+Yc1Psrw91k+zPF3eT4o8LdF3i/xN2Xeq/DXVd6t8Vd13mnwl03ebvEXbd4C+HOQNyH+DOYNhD9FeR3jT3BeI/hjklcp/ojmFYY/ZHmZ4w94XhL4fZEXJX5P5gWF31V5XuN3dJ4z+G2TZy1+y+YZh990edrjN3yeCvj1kCcj/k3MEwn/OuXxmVmhMye8mxfSBeHtopAsCY/LQrwiPKwK0ZpwnxHCrHCXE4K8cFsQ/KJwUxK8snBdEdyqcFUTnLpw2RDspnDREqy2cA4IJiicQYIBC6eIoKPCCSZouHBMCCopHFGCQguHjCCzwgEnSLywLwiiKOxJgiALu4rAq8KOJnC6sG0IrClsWQJjC5uOQLvChidQvrAeCGQovIkEIhZeJwKeCq9mZsV3c2I6L75dEJNF8XFJjJfFhxUxWhXv18QwI95lxSAn3uZFvyDeFEWvJF6XRbciXlVFpyZe1kW7IV40RaslnrdFExDPQNGAxFNY1BHxBBU1TDzGRZUQj0hRocRDWpQZ8YAVv6dmn/++vLj3fUjirizyirijipwmbusia4hbpshY4qYt0o644YqUJ677IhmIb0KRiMTXsYgn4qtUxGZmpXROejsvJQvS46IUL0kPy1K0It2vSuGadJeRgqx0m5P8vHRTkLyidF2S3LJ0VZGcqnRZk+y6dNGQrKZ03pLMtnQGSAYonUKSDksniKSh0jEmqbh0REgKKR1S0ve2PGC+H620/z38vLQnSIIo7UoSL0s7isSp0rYmsbq0ZUiMKW1aEm1LG45EudK6J5G+9CaQiFB6HUl4LL1KJCyVXs7Mym/n5GReflyQ40X5YUmOluX7FTlcle/W5CAj32ZlPyff5GWvIF8XZbckX5VlpyJfVmW7Jl/UZashnzdlsyWftWUDkE9BWYfkE1jWEPkYlVVMPsLl75RwSH5/VvLB99Jn5H1WFjl5j5e/R2dXlHlJ3pFlTpG3VZnV5C1dZgx505RpS96wZcqR112Z9OQ3vkwE8utQxiP5VSxjifwyldGZWSWZUx7nlXhBeVhUoiXlflkJV5S7VSVYU24zip9VbnKKl1euC4pbVK5KilNWLiuKXVUuaopVV84bitlUzlqK0VZOAUUHlRNI0WDlGFG+0/ER9h3SlMPvsEMqB5Qi0co+o4isssd9j7yy+/1yRWVHUjhZ2VYUVlW2NIXRlU1DoU1lw1IoW1l3FNJV3ngK4SuvAwUPlVeRgsXKy0RBU+XFzKz6OKfG8+rDghotqvdLaris3q2owap6u6b6GfUmq3o59TqvugX1qqg6JfWyrNoV9aKqWjX1vK6aDfWsqRot9bSt6oB6AqrfrfAY/i4n6tF3yMfUQ1yVCfWAVCVK3adVkVH3WFXg1F1e5QV1R1Q5Sd2WVVZRt1SV0dRNXaUNdcNUKUtdt1XSUd+4KuGpr30VD9RXoYpF6stYRRP1RaoiM7NaPKc9zGvRgna/qIVL2t2yFqxot6uav6bdZDQvq13nNDevXRU0p6hdljS7rF1UNKuqndc0s66dNTSjqZ22NL2tnQDfpVw7/i63sHaEaAqqHWKajGsHhCaR2j6libS2x2gCq+1y2vfK3BE0TtS2JY2VtS1FY1RtU9NoXdswNMrU1i2NtLU3jka42mtPw33tVaBhofYy0tBYe5FoSKo9n5nVH+b0aF6/X9DDRf1uSQ+W9dsV3V/Vb9Z0L6NfZ3U3p1/ldaegXxZ1u6RflHWrop9XdbOmn9V1o6GfNnW9pZ+0dQ3Qj0FdhfQjWFcQ/RDVZUw/wHWJ0PdJXaT0PVoXGH2X/V71+s73jyXo26LOSvqWrDOKvqnqtKZv6Dpl6OumTlr6G1snHP21q+Oe/srXsUB/GepopL+IdSTRn6c6PDNrRHPG/bwRLhh3i0awZNwuG/6KcbNqeGvGdcZws8ZVznDyxmXBsIvGRcmwysZ5xTCrxlnNMOrGacPQm8ZJy9DaxjFgqKBxBBkKbBwihowaB5gh4cY+YYiksUcZAm3sMgbPGjucwfHGtmCworElGYxsbCoGrRobmkHpxrphkKbxxjII23jtGLhrvPIMzDdeBgYaGi8iA4mN54kBp8azmVnzfs4M5827BTNYNG+XTH/ZvFkxvVXzes10M+ZV1nRy5mXetAvmRdG0SuZ52TQr5lnVNGrmad3UG+ZJ09Ra5nHbVAHzCDQVyDyETRkxD1BTwsx93BQJc480BcrcpU2eMXdY8zsqbPMmK5hboslI5qZs0oq5oZqUZq7rJmmYb0yTsMzXtok75ivXxDzzpW+igfkiNJHIfB6bcGI+S01oZtYK56y7eStYsG4XLX/Julm2vBXretVy16yrjOVkrcucZeeti4JlFa3zkmWWrbOKZVSt05ql162ThqU1reOWpbatI8BSQOsQsmTYOkAsCbX2MUvErT3CEkhrl7J42tphviOOtf2d1HhrS7AY0dqULFq2NhSLUq11zSJ1641hEab12rJw23rlWJhrvfQs1LdeBBYSWs8jC46tZ4kFpdbTmVn7bs4O5u3bBdtftG+WbG/Zvl6x3VX7as12MvZl1rZz9kXetgr2edE2S/ZZ2TYq9mnV1mv2Sd3WGvZx01Zb9lHbVgD7ELRlyD6AbQmx91FbxOw93BYIe5e0ecreoW2OsbdZm+XsLd5mBHtTtGnJ3pBtSrHXVZvU7De6TRj2a9PGLfuVbWOO/dK1Uc9+4dtIYD8PbTiyn8U2lNhPUxucmXWCOed23vEXnJtFx1tyrpcdd8W5WnWcNecy49hZ5yLnWHnnvOCYRees5Bhl57Ti6FXnpOZodee44ahN56jlKG3nEHBk0DmAHAl29hFHRJ09zBFwZ5dweNLZoRyOdrYZ5zsib3EOwzubgkOLzobkULKzrjik6rzRHEJ3XhsObjqvLAeznZeOg7rOC89BfOd54MCh8yxyoNh5mjhg6jyZmXVv51x/3r1ZcL1F93rJdZfdqxXXWXUv11w7415kXSvnnudds+CeFV2j5J6WXb3inlRdreYe11214R41XaXlHrZdGXAPQFeC3H3YFRF3D3UFzN3FXZ5wd0iXo9xt+jvau1vfDYVzN3mXFtwN0aUkd112ScV9o7qE5r7WXdxwX5kuZrkvbRd13Beui3juc9+FA/dZ6EKR+zR2wcR9krrAzKznz3k385634F0veu6Sd7XsOSve5apnr3kXGc/Keuc5z8x7ZwXPKHqnJU8veycVT6t6xzVPrXtHDU9peoctT257B4Angd4+5Imwt4d4AurtYh6PezuEx5HeNuWxtLfFeAzrbXIezXsbgkeJ3rrkkbL3RvEI1XutebjuvTI8zPReWh5qey8cD3G9554H+96zwINC72nkgbH3JPGA1PtlZta/mfO9ef96wXcX/asl31n2L1d8e9W/WPOtjH+e9c2cf5b3jYJ/WvT1kn9S9rWKf1z11Zp/VPeVhn/Y9OWWf9D2JcDfB30R8vdgX0D8XdTnMX8H9znC3yZ9lvK3aP+7Gm6yPs35G7xPCf666JOS/0b2CcV/rfq45r/SfczwX5o+avkvbB9x/OeuD3v+M9+HAv9p6IOR/yT2gcT/JfXbM7OBNxdczwfuQnC1GDhLweVyYK8EF6uBtRacZwIzG5zlAiMfnBYCvRiclAKtHBxXArUaHNUCpR4cNgK5GRy0Aqkd7AOBCAZ7UCDAwS4S8GiwgwUcHmwTAUsGW9R3pQ02v5s5G2xwAcUH60JAisEbKSDk4LUS4GrwSgswPXhpBKgZvLACxA6eOwHsBs+8APKDp0EAhsGTKADi4JckaKfBzzOz4fVc6M6HVwuhsxheLoX2cnixElqr4flaaGbCs2xo5MLTfKgXwpNiqJXC43KoVsKjaqjUwsN6KDfCg2YotcL9digC4R4YClC4C4c8Eu6gIYeF23jIEuEWGTJUuEmHNBNusCHFhet8SArhGzEkpPC1HOJK+EoNMS18qYeoEb4wQ8QKn9sh7ITP3BDywqd+CAbhkzAEovCXOGwn4c9p2JqZjdy56Go+chaiy8XIXoouliNrJTpfjcy16CwTGdnoNBfp+eikEGnF6LgUqeXoqBIp1eiwFsn16KARSc1ovxWJ7WgPiAQw2oUiHo52kIhDo20sYvFoi4gYMtqkIpqONpiIYqN1LiL56I0QEWL0WopwOXqlRJgavdQiVI9eGBFiRs+tCLajZ04EudFTLwL96EkQAWH0SxS14+jnJGql0U8zs/HVXOzMx5cLsb0YXyzF1nJ8vhKbq/HZWmxk4tNsrOfik3ysFeLjYqyW4qNyrFTiw2os1+KDeiw14v1mLLbivXYsAPEuGPNQvAPHHBJvozGLxVt4zBDxJhnTVLxBxxQTr7MxycVv+JgQ4tdijEvxKznGlPilGqNa/EKPESN+bsawFT+zY8iJn7ox6MVP/BgI4l/CuB3FP8dxK4l/SuPmzGzizCWX84m9kFwsJtZScr6cmCvJ2WpirCWnmUTPJie5RMsnx4VELSZHpUQpJ4eVRK4mB7VEqif7jURsJnutRGgnu0DCg8kOlHBwso0kLJpsYQmDJ5tEQpPJBpVQdLLOJCSbvOESgk9eCwkuJq+kBJOTl0qCqskLLUH05LmRwGbyzEogO3nqJKCbPPESwE9+CZJ2mPwcJa04+SlJmmny48xsejmX2vPpxUJqLabnS6m5nJ6tpMZqerqW6pn0JJtqufQ4n6qF9KiYKqX0sJzKlfSgmkq1dL+eio10r5kKrXS3nfJAugOmHJRuwymLpFtoymDpJp7SRLpBphSVrtMpyaRv2JTg0td8igvpKzHFpPSlnKJK+kJNES19rqewkT4zU8hKn9op6KRP3BTw0l/8tB2kP4dpK0p/itNmkv6Ypo2Z2Y4917mY71gLnfPFjrnUOVvuGCud09WOvtY5yXS0bOc411HznaNCRyl2Dksdudw5qHSkame/1hHrnb1GR2h2dlsdvt3ZAToc2NmGOizc2UI6DNrZxDo03tkgOhTZWac6JN15w3QItvOa6+B855XQwcTOS6mDyp0XSgdRO8+1Dqx3nhkdyOw8tTqg3XnidAC384vXafudn4NOK+z8FHWacefHpNNIOz/MzHYv5rrWfPd8oWsuds+WusZy93Slq692T9a6WqZ7nO2que5RvqsUuofFrlzqHpS7UqW7X+2Kte5evSs0urvNLt/q7rS7HNDdBrss1N2CuwzS3US7NNbdwLsU0V0nuyTVfUN3Cab7mu3iXPcV38WE7kuxi0rdF3IXUbrP1S6sdZ/pXcjoPjW7oNV9YncBp/uL22173Z/9bivo/hR2m1H3x7jbSLo/pN36zGzPmuudz/fMhd7ZYs9Y6p0u9/SV3slqT1vrHWd6arZ3lOsp+d5hoScXewelnlTu7Vd6YrW3V+sJ9d5uo8c3ezutHtfubQM9FuxtQT0G7m0iPRrtbWA9Cu+tEz2S7L2hegTde830cLb3iuthfO+l0EPF3guph8i950oPVnvPtB6k954aPdDsPbF6gN37xem13d7PXq/l934Kes2w92PUa8S9H5JePe39fWa2fz7XN+f7Zwt9Y7F/utTXl/snK31ttX+81lcz/aNsX8n1D/N9udA/KPalUn+/3Bcr/b1qX6j1d+t9vtHfafa5Vn+73WeB/hbYZ6D+Jtynkf4G2qew/jreJ4n+G7JPUP3XdB9n+q/YPsb1X/J9VOi/EPuI1H8u92Gl/0ztQ1r/qd4Hjf4Tsw9Y/V/sftvp/+z2W17/J7/fDPo/hv1G1P8h7teT/t/Tfm1mdmDODc7mB8bC4HRxoC8NTpYH2srgeHWgrg2OMgMlOzjMDeT84KAwkIqD/dJALA/2KgOhOtitDfj6YKcx4JqD7daAbQ+2gAEDDjahAQ0PNpABhQ7WsQGJD94QA4IcvKYGOD14xQwwdvCSG6D84IUwQMTBc2kAy4NnygBSB0+1AagPnhgDwBz8Yg3a9uBnZ9ByBz95g6Y/+DEYNMLBD9GgHg/+ngxq6eBvM7PDs7mhMT88XRjqi8OTpaG2PDxeGaqrw6O1oZIZHmaHcm54kB9KheF+cSiWhnvloVAZ7laHfG24Ux9yjeF2c8i2hlvtIQMMN8EhDQ034CGFDNfRIYkN3+BDghi+Joc4NXxFDzFm+JIdotzwBT9EhOFzcQhLw2fyEFKGT9UhqA2f6EPAGP5iDtvW8Gd72HKGP7nDpjf80R82guEP4bAeDf8eD2vJ8G/psDozOzLmRqfzI31hdLI40pZGx8sjdWV0tDpS1kaHmZGcHR3kRlJ+tF8YicXRXmkklEe7lRFfHe3URlx9tN0Ysc3RVmvEtEebwIgGRxvQiIJH68iIREdvsBGBj14TI5wcvaJGGD16yYxQdvSCGyH86LkwgsXRM2kEyaOnyghUR0+0EaCPfjFGbXP0szVq2aOfnFHTHf3ojRr+6IdgVA9Hf49GtXj0t2RUTUf/PTM7Pp0b6/Pjk4Wxtjg+Xhqry+OjlbGyOj5cG8uZ8UF2LOXG+/mxWBjvFcdCabxbHvOV8U51zNXG2/Ux2xhvNcdMa7zZHtPAeAMcU9B4HR6TyPgNOiaw8Wt8jBPjV+QYo8Yv6THKjF+wY4QbP+fHsDB+Jo4hafxUHoPK+Ik6BrTxL/q4bYx/Nscta/yTPW464x/dccMb/+CP68H47+G4Fo3/Fo+ryfi/03FlZnaiz01O5ifawuR4caIuTY6WJ8rK5HB1Iq9NDjITKTvZz03E/GSvMBGKk93ShC9PdioTrjrZrk3Y+mSrMWGak83WhG5PNoAJBU7WoQkJT94gEwKdvMYmOD55RUwwcvKSmqD05AUzQdjJc24C85NnwgQSJ0+lCShPnigTQJ38ok3a+uRnY9IyJz9Zk6Y9+dGZNNzJD96k7k/+Hkxq4eRv0aQaT/47mVTSyX/NzE5P5qba/PR4YaouTo+Wpsry9HBlKq9OD9amUma6n52KuelefioUprvFKV+a7pSnXGW6XZ2ytelWfco0ppvNKd2abrSnFDBdB6ckNH0DTwlk+hqd4tj0FT7FiOlLcopS0xf0FGGmz9kpzE2f8VNImD4Vp6A0fSJPAWX6izpta9Of9WnLmP5kTpvW9Ed72nCmP7jTujf9uz+tBdO/hdNqNP3veFpJpv+VTsv/HyxkcYdmnFajAAAAAElFTkSuQmCC',
  'base64',
);

const loc = (base, value) => ({
  [`${base}_ca`]: `${value} CA`,
  [`${base}_es`]: `${value} ES`,
  [`${base}_en`]: `${value} EN`,
});

const data = {
  site_settings: {
    foto: 'abc123',
    nom: 'Aitor Test',
    ...loc('titol', 'Dev'),
    ...loc('resum_sidebar', 'Resum'),
    ...loc('descripcio_sobre_mi', '<p><strong>Entiendo la tecnología como una herramienta.</strong></p><p>Un párrafo más largo para que la sección tenga cuerpo real y se vea cómo se reparte el espacio en pantalla.</p><p>Otro párrafo con más texto de ejemplo.</p>'),
    linkedin_url: 'https://linkedin.com/in/x',
    github_url: 'https://github.com/x',
    email: 'a@b.c',
  },
  blog_settings: { ...loc('title', 'Blog'), ...loc('description', 'Desc') },
  post: [
    {
      slug: 'hola',
      cover_image: 'cover123',
      published_at: '2026-01-01T00:00:00Z',
      ...loc('title', 'Hola'),
      ...loc('excerpt', 'Extracto'),
      body_ca: 'Text',
      categories: [],
      tags: [],
    },
  ],
  category: [],
  tag: [],
  experiencia: Array.from({ length: 5 }, (_, i) => ({
    empresa: `Empresa ${i + 1}`,
    dates: `${2024 - i * 2} - ${i === 0 ? 'Actual' : 2026 - i * 2}`,
    tecnologies: ['Django', 'Python', 'SQL'],
    ordre: i,
    ...loc('titol', `Cargo ${i + 1}`),
    ...loc('descripcio', 'Descripción de las responsabilidades y logros del puesto, con detalle suficiente para ocupar varias líneas en pantalla y simular contenido real de un CV.'),
  })),
  formacio: Array.from({ length: 3 }, (_, i) => ({
    centre: `Centro ${i + 1}`,
    dates: `${2010 + i * 2} - ${2012 + i * 2}`,
    ordre: i,
    ...loc('titulacio', `Titulación ${i + 1}`),
  })),
  habilitat: [
    { categoria: 'tecnica', ...loc('nom', 'Django') },
    { categoria: 'tecnica', ...loc('nom', 'SQL') },
    { categoria: 'clau', ...loc('nom', 'Lideratge') },
  ],
};

http
  .createServer((req, res) => {
    // Imágenes privadas, como en un Directus real sin permisos públicos: exigen el token
    if (req.url.startsWith('/assets/')) {
      if (req.headers.authorization !== 'Bearer ' + (process.env.MOCK_DIRECTUS_TOKEN ?? process.env.DIRECTUS_TOKEN ?? 'x')) {
        res.writeHead(403, { 'content-type': 'application/json' });
        return res.end(JSON.stringify({ errors: [{ message: 'Forbidden' }] }));
      }
      res.writeHead(200, { 'content-type': 'image/png' });
      return res.end(PHOTO_PNG);
    }

    const name = req.url.split('?')[0].split('/').pop();
    let out = data[name] ?? [];

    // Filtro por slug (?filter[slug][_eq]=x o filter={"slug":{"_eq":"x"}})
    const url = decodeURIComponent(req.url);
    const slug = url.match(/slug\]?\[_eq\]=([^&]+)/) || url.match(/"slug":\{"_eq":"([^"]+)"/);
    if (name === 'post' && slug) out = out.filter((post) => post.slug === slug[1]);

    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ data: out }));
  })
  .listen(PORT, () => console.log(`Directus simulado en el puerto ${PORT}`));
