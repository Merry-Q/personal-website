"""Prepare only explicitly selected project material; never expose workspace roots."""
from pathlib import Path
import json, shutil, html, re
site=Path(__file__).parent
root=site.parent
projects=json.loads((site/'portfolio.json').read_text(encoding='utf-8'))
services={s['id']:s for s in json.loads((site/'local-services.json').read_text(encoding='utf-8'))}
assetdir=site/'public'/'materials'
assetdir.mkdir(parents=True,exist_ok=True)
e=html.escape
def card(p, position):
    docs=[]
    for i,(label,source) in enumerate(p['docs']):
        src=root/source
        if not src.is_file(): raise FileNotFoundError(source)
        name=p['id']+'-'+str(i+1)+src.suffix.lower()
        if src.suffix.lower() in ['.md','.txt','.json']:
            content=src.read_text(encoding='utf-8-sig')
            if re.search(r'(?:sk-[A-Za-z0-9]{20,}|AKIA[A-Z0-9]{16})',content): raise ValueError('Possible secret in selected document')
            (assetdir/name).write_text(content,encoding='utf-8')
            preview=f'<button type="button" data-preview="/materials/{name}" data-title="{e(label)}">预览</button>'
        else:
            shutil.copy2(src,assetdir/name)
            preview=f'<a href="/materials/{name}" target="_blank" rel="noopener">打开 PDF</a>' if src.suffix.lower()=='.pdf' else f'<a href="/materials/{name}" target="_blank" rel="noopener">打开</a>'
        docs.append(f'<li><span>{e(label)}</span>{preview}</li>')
    service=services.get(p.get('service'))
    isbuilt=p['group']=='built'
    links=[]
    if isbuilt:
        if p.get('download'):
            links.append(f'<a class="experience-link" href="{e(p["download"],quote=True)}" target="_blank" rel="noopener">下载应用 ↗</a>')
        elif p.get('url'):
            links.append(f'<a class="experience-link" href="{e(p["url"],quote=True)}" target="_blank" rel="noopener">体验产品 ↗</a>')
        elif service:
            links.append(f'<a class="experience-link" href="http://localhost:{service["port"]}/" target="_blank" rel="noopener">体验产品 ↗</a>')
        if p.get('case'):
            links.append(f'<a class="case-link" href="{e(p["case"],quote=True)}">阅读案例</a>')
        if p.get('github'):
            links.append(f'<a class="github-link" href="{e(p["github"],quote=True)}" target="_blank" rel="noopener">查看 GitHub</a>')
    else:
        if p.get('github'):
            links.append(f'<a class="github-link" href="{e(p["github"],quote=True)}" target="_blank" rel="noopener">查看 GitHub</a>')
        links.append(f'<button type="button" class="expand-toggle" aria-expanded="false" aria-controls="detail-{p["id"]}">查看项目详情</button>')
    link=''.join(links)
    startup=''
    if isbuilt:
        startup=f'<p class="launch-note">本地演示 · 先在项目根目录运行 <code>node personal-website/local-dev.mjs {service["id"]}</code>。端口 {service["port"]}，链接在新标签页打开。</p>' if service and not p.get('url') else ''
        if p.get('command'): startup=f'<p>本地启动（工作目录：产品经理）：<code>{e(p["command"])}</code></p>'
        if p.get('url'): startup=f'<p class="launch-note">在线体验：<a href="{e(p["url"],quote=True)}" target="_blank" rel="noopener">{e(p["url"])}</a></p>'
    # Design 02: real product imagery moves onto the sleeve, ahead of the archive.
    image_name = p.get('image') or ('papermind-reading.png' if p['id']=='paper' else None)
    image=f'<figure><img src="/images/demo/{image_name}" alt="{e(p["name"])}已有界面截图" loading="lazy"><figcaption>已有项目截图；具体能力与状态见本页说明。</figcaption></figure>' if image_name else ''
    cover=''
    if isbuilt and image_name:
        destination=p.get('case') or f'#detail-{p["id"]}'
        cover=f'''<figure class="project-cover"><a class="cover-link" href="{e(destination,quote=True)}" aria-label="阅读 {e(p['name'])} 项目案例"><div class="cover-mat"><img src="/images/demo/{image_name}" alt="{e(p['name'])}真实项目界面" loading="lazy" decoding="async"></div><span class="cover-caption"><span>界面档案 · {e(p['name'])}</span><span>阅读案例 <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></span></span></a></figure>'''
        image=''
    body=''.join(f'<div><h4>{label}</h4><p>{e(p[key])}</p></div>' for label,key in [('目标用户与范围','audience'),('核心问题','problem'),('核心价值／研究结论','value'),('主要流程','flow'),('最终产出／已有资料','output'),('产品判断与取舍','thinking'),('当前局限与下一步','limits')])
    doclist='<h4>实际项目资料</h4><ul class="material-list">'+''.join(docs)+'</ul>' if docs else '<p>当前以源码为实现证据，尚无独立研究文档可预览。</p>'
    side='A' if isbuilt else 'B'
    featured=' flagship' if isbuilt and position < 3 else ''
    detail_body=f'<div class="project-detail">{image}<div class="detail-prose">{body}{startup}{doclist}</div></div>'
    if isbuilt:
        klass=f'portfolio-project{featured}'
        detail=f'<details id="detail-{p["id"]}"><summary>项目思考与资料 <span class="detail-toggle" aria-hidden="true"></span></summary>{detail_body}</details>'
    else:
        klass='portfolio-project expand-card'
        close=f'<button type="button" class="expand-close" aria-controls="detail-{p["id"]}">收起详情</button>'
        detail=f'<div class="project-expand" id="detail-{p["id"]}" inert><div class="project-expand-inner">{detail_body}{close}</div></div>'
    return f'''<article class="{klass}" id="project-{p['id']}" aria-labelledby="title-{p['id']}"><div class="project-summary">{cover}<div class="project-copy"><div class="project-title"><span class="catalog-index" aria-label="{side} 面第 {position} 个项目">{side} / {position:02}</span><h3 id="title-{p['id']}">{e(p['name'])}</h3></div><p class="project-deck">{e(p['summary'])}</p><p class="project-audience">面向：{e(p['audience'])}</p><div class="project-actions">{link}</div><p class="project-status">{e(p['status'])}</p></div></div>{detail}</article>'''
sections=[]
for group,anchor,title,intro in [('built','tracks','全面落地','把问题，做成可用的答案。'),('learning','research','探索创新','让好奇心，留下具体的形状。')]:
    items=[p for p in projects if p['group']==group]
    side='A' if group=='built' else 'B'
    sections.append(f'<section class="portfolio-section" id="{anchor}" aria-labelledby="heading-{anchor}"><header class="portfolio-heading"><div class="chapter-title"><span class="side-mark" aria-hidden="true">{side}</span><h2 id="heading-{anchor}">{title}</h2></div><p>{intro}</p><span class="chapter-count">{len(items):02} 个项目档案</span></header><div class="project-list">'+''.join(card(p,i) for i,p in enumerate(items,1))+'</div></section>')
# Design 01: A/B sleeve directory, ordinary links with progressive scroll focus.
directory=''.join(f'<a href="#project-{p["id"]}" data-project-nav="{p["id"]}"><span>{i:02}</span>{e(p["name"])}</a>' for i,p in enumerate([p for p in projects if p['group']=='built'],1))
nav=f'<nav class="edition-nav" aria-label="作品目录"><div class="edition-sides"><a href="#tracks" data-section-nav="tracks"><span>A</span> 全面落地</a><a href="#research" data-section-nav="research"><span>B</span> 探索创新</a></div><div class="edition-tracks">{directory}</div></nav>'
markup=nav+'\n'+'\n'.join(sections)
page=(site/'index.html').read_text(encoding='utf-8')
if '<!-- PORTFOLIO START -->' in page:
    page=re.sub(r'<!-- PORTFOLIO START -->[\s\S]*?<!-- PORTFOLIO END -->','<!-- PORTFOLIO START -->'+markup+'<!-- PORTFOLIO END -->',page)
else:
    page=re.sub(r'      <section class="track-section"[\s\S]*?(?=      <section class="contact")','<!-- PORTFOLIO START -->'+markup+'<!-- PORTFOLIO END -->\n',page)
    page=re.sub(r'    <dialog class="booklet-dialog"[\s\S]*?</dialog>','',page)
    page=page.replace('<a href="#tracks">曲目</a>','<a href="#tracks">全面落地</a><a href="#research">探索创新</a>')
    page=page.replace('<div class="hero-actions">','<div class="hero-actions"><a class="portfolio-primary" href="#tracks">查看全面落地 ↓</a>')
    page=page.replace('<span class="button-label">播放专辑</span>','<span class="button-label">播放背景音乐</span>')
    page=page.replace('AI 产品经理作品集、经历与真实音乐播放器。','面向产品经理岗位的作品集：全面落地、产品思考与研究积累。')
    page=page.replace('<title>ROOTED / 张嘉琪的个人专辑</title>','<title>张嘉琪 · 产品经理作品集 / ROOTED</title>')
    page=page.replace('<body>','<body><a class="skip-link" href="#tracks">跳到全面落地</a>')
    page=page.replace('<script type="module" src="/script.js"></script>','<dialog id="material-dialog" aria-labelledby="material-title"><header><h2 id="material-title">资料预览</h2><button type="button" id="material-close">关闭</button></header><p>原始资料以 Markdown 渲染预览；其中规划、目标及历史状态不等同于已实现能力。</p><div id="material-content" class="md"></div></dialog>\n<script type="module" src="/portfolio.js"></script>\n<script type="module" src="/script.js"></script>')
(site/'index.html').write_text(page,encoding='utf-8')
print(f'Prepared {len(projects)} projects and {sum(len(p["docs"]) for p in projects)} document links.')
